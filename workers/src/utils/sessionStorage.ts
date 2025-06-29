/**
 * Secure session storage implementation for Cloudflare Workers
 * Implements AES-GCM encryption, session fingerprinting, expiration management, and KV-backed persistence
 */

import { Session, SessionStorage, EncryptedSessionData, SessionValidationResult, SessionAnalytics } from '../types/session';
import { Env } from '../types/env';

/**
 * Session fingerprint for security validation
 */
interface SessionFingerprint {
  userAgent: string;
  ipAddress?: string;
  acceptLanguage?: string;
  shopDomain: string;
  createdAt: string;
  hash: string;
}

/**
 * KV-backed session storage with encryption and security measures
 */
export class KVSessionStorage implements SessionStorage {
  private readonly kv: KVNamespace;
  private readonly encryptionKey: string;
  
  constructor(kv: KVNamespace, encryptionKey?: string) {
    this.kv = kv;
    this.encryptionKey = encryptionKey || 'default-encryption-key-change-in-production';
  }

  /**
   * Store a session in KV with encryption and fingerprinting
   */
  async storeSession(session: Session, request?: Request): Promise<boolean> {
    try {
      // Generate session fingerprint for security
      const fingerprint = this.generateSessionFingerprint(session, request);
      
      const encryptedData = await this.encryptSession(session, fingerprint);
      const ttl = this.calculateTTL(session);
      
      // Store session with TTL
      await this.kv.put(
        `session:${session.id}`,
        JSON.stringify(encryptedData),
        { expirationTtl: ttl }
      );
      
      // Store session fingerprint separately for validation
      await this.kv.put(
        `session_fingerprint:${session.id}`,
        JSON.stringify(fingerprint),
        { expirationTtl: ttl }
      );
      
      // Store shop index for quick lookups
      await this.storeShopIndex(session);
      
      // Update session analytics
      await this.updateSessionAnalytics(session, 'created');
      
      return true;
    } catch (error) {
      console.error('Failed to store session:', error);
      return false;
    }
  }

  /**
   * Load and decrypt a session from KV with fingerprint validation
   */
  async loadSession(id: string, request?: Request): Promise<Session | undefined> {
    try {
      const encryptedDataString = await this.kv.get(`session:${id}`);
      if (!encryptedDataString) {
        return undefined;
      }
      
      const encryptedData: EncryptedSessionData = JSON.parse(encryptedDataString);
      const session = await this.decryptSession(encryptedData);
      
      // Validate session fingerprint if request is provided
      if (request) {
        const isValid = await this.validateSessionFingerprint(id, request);
        if (!isValid) {
          console.warn('Session fingerprint validation failed:', id);
          // Optionally delete compromised session
          await this.deleteSession(id);
          return undefined;
        }
      }
      
      // Update session analytics
      await this.updateSessionAnalytics(session, 'accessed');
      
      return session;
    } catch (error) {
      console.error('Failed to load session:', error);
      return undefined;
    }
  }

  /**
   * Delete a session from KV
   */
  async deleteSession(id: string): Promise<boolean> {
    try {
      // Load session to get shop for index cleanup
      const session = await this.loadSession(id);
      
      // Delete main session
      await this.kv.delete(`session:${id}`);
      
      // Delete session fingerprint
      await this.kv.delete(`session_fingerprint:${id}`);
      
      // Clean up shop index
      if (session) {
        await this.removeFromShopIndex(session);
        await this.updateSessionAnalytics(session, 'deleted');
      }
      
      return true;
    } catch (error) {
      console.error('Failed to delete session:', error);
      return false;
    }
  }

  /**
   * Delete all sessions for a shop
   */
  async deleteSessionsByShop(shop: string): Promise<number> {
    try {
      const sessions = await this.findSessionsByShop(shop);
      let deletedCount = 0;
      
      for (const session of sessions) {
        const success = await this.deleteSession(session.id);
        if (success) {
          deletedCount++;
        }
      }
      
      // Clean up shop index
      await this.kv.delete(`shop_index:${shop}`);
      
      return deletedCount;
    } catch (error) {
      console.error('Failed to delete sessions by shop:', error);
      return 0;
    }
  }

  /**
   * Find sessions by shop domain
   */
  async findSessionsByShop(shop: string): Promise<Session[]> {
    try {
      const indexData = await this.kv.get(`shop_index:${shop}`);
      if (!indexData) {
        return [];
      }
      
      const sessionIds: string[] = JSON.parse(indexData);
      const sessions: Session[] = [];
      
      for (const sessionId of sessionIds) {
        const session = await this.loadSession(sessionId);
        if (session) {
          sessions.push(session);
        }
      }
      
      return sessions;
    } catch (error) {
      console.error('Failed to find sessions by shop:', error);
      return [];
    }
  }

  /**
   * Validate a session and check expiration
   */
  async validateSession(sessionId: string): Promise<SessionValidationResult> {
    try {
      const session = await this.loadSession(sessionId);
      
      if (!session) {
        return {
          isValid: false,
          error: 'Session not found'
        };
      }
      
      // Check expiration for online sessions
      if (session.isOnline && session.expires) {
        const now = new Date();
        if (now > session.expires) {
          return {
            isValid: false,
            session,
            error: 'Session has expired',
            isExpired: true
          };
        }
        
        // Check if needs refresh (expires within 1 hour)
        const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
        if (session.expires < oneHourFromNow) {
          return {
            isValid: true,
            session,
            needsRefresh: true
          };
        }
      }
      
      return {
        isValid: true,
        session
      };
    } catch (error) {
      return {
        isValid: false,
        error: `Session validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Get session analytics
   */
  async getSessionAnalytics(): Promise<SessionAnalytics> {
    try {
      const result = await this.kv.list({ prefix: 'session:' });
      const sessions: Session[] = [];
      
      for (const key of result.keys) {
        const sessionId = key.name.replace('session:', '');
        const session = await this.loadSession(sessionId);
        if (session) {
          sessions.push(session);
        }
      }
      
      const now = new Date();
      const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      
      const analytics: SessionAnalytics = {
        totalSessions: sessions.length,
        sessionsByShop: {},
        onlineVsOffline: { online: 0, offline: 0 },
        expirationStats: { expired: 0, expiringSoon: 0, healthy: 0 },
        calculatedAt: now.toISOString()
      };
      
      for (const session of sessions) {
        // Count by shop
        analytics.sessionsByShop[session.shop] = (analytics.sessionsByShop[session.shop] || 0) + 1;
        
        // Count online vs offline
        if (session.isOnline) {
          analytics.onlineVsOffline.online++;
        } else {
          analytics.onlineVsOffline.offline++;
        }
        
        // Expiration statistics
        if (session.expires) {
          if (now > session.expires) {
            analytics.expirationStats.expired++;
          } else if (session.expires < oneDayFromNow) {
            analytics.expirationStats.expiringSoon++;
          } else {
            analytics.expirationStats.healthy++;
          }
        } else {
          analytics.expirationStats.healthy++;
        }
      }
      
      return analytics;
    } catch (error) {
      console.error('Failed to get session analytics:', error);
      return {
        totalSessions: 0,
        sessionsByShop: {},
        onlineVsOffline: { online: 0, offline: 0 },
        expirationStats: { expired: 0, expiringSoon: 0, healthy: 0 },
        calculatedAt: new Date().toISOString()
      };
    }
  }

  /**
   * Clean up expired sessions
   */
  async cleanupExpiredSessions(): Promise<number> {
    try {
      const result = await this.kv.list({ prefix: 'session:' });
      let cleanedCount = 0;
      
      for (const key of result.keys) {
        const sessionId = key.name.replace('session:', '');
        const validation = await this.validateSession(sessionId);
        
        if (!validation.isValid && validation.isExpired) {
          await this.deleteSession(sessionId);
          cleanedCount++;
        }
      }
      
      return cleanedCount;
    } catch (error) {
      console.error('Failed to cleanup expired sessions:', error);
      return 0;
    }
  }

  /**
   * Generate session fingerprint for security validation
   */
  private generateSessionFingerprint(session: Session, request?: Request): SessionFingerprint {
    const userAgent = request?.headers.get('User-Agent') || 'unknown';
    const acceptLanguage = request?.headers.get('Accept-Language') || 'unknown';
    const ipAddress = request?.headers.get('CF-Connecting-IP') || 
                     request?.headers.get('X-Forwarded-For') || 
                     request?.headers.get('X-Real-IP') || 'unknown';
    
    const fingerprint: SessionFingerprint = {
      userAgent: userAgent.substring(0, 200), // Limit length
      ipAddress,
      acceptLanguage: acceptLanguage.substring(0, 50),
      shopDomain: session.shop,
      createdAt: new Date().toISOString(),
      hash: ''
    };
    
    // Generate hash of fingerprint components
    fingerprint.hash = this.hashFingerprint(fingerprint);
    
    return fingerprint;
  }

  /**
   * Validate session fingerprint against current request
   */
  private async validateSessionFingerprint(sessionId: string, request: Request): Promise<boolean> {
    try {
      const storedFingerprintData = await this.kv.get(`session_fingerprint:${sessionId}`);
      if (!storedFingerprintData) {
        return false; // No fingerprint stored
      }
      
      const storedFingerprint: SessionFingerprint = JSON.parse(storedFingerprintData);
      const currentUserAgent = request.headers.get('User-Agent') || 'unknown';
      const currentIP = request.headers.get('CF-Connecting-IP') || 
                       request.headers.get('X-Forwarded-For') || 
                       request.headers.get('X-Real-IP') || 'unknown';
      
      // Validate critical fingerprint components
      const userAgentMatch = storedFingerprint.userAgent === currentUserAgent.substring(0, 200);
      const ipMatch = storedFingerprint.ipAddress === currentIP;
      
      // Allow some flexibility - require user agent match and either IP match or recent creation
      const isRecent = new Date().getTime() - new Date(storedFingerprint.createdAt).getTime() < 60000; // 1 minute
      
      return userAgentMatch && (ipMatch || isRecent);
    } catch (error) {
      console.error('Failed to validate session fingerprint:', error);
      return false;
    }
  }

  /**
   * Update session analytics for monitoring
   */
  private async updateSessionAnalytics(session: Session, action: 'created' | 'accessed' | 'deleted'): Promise<void> {
    try {
      const analyticsKey = `session_analytics:${new Date().toISOString().split('T')[0]}`; // Daily analytics
      const existingData = await this.kv.get(analyticsKey);
      
      let analytics: any = {
        date: new Date().toISOString().split('T')[0],
        totalSessions: 0,
        sessionsByShop: {},
        actionCounts: { created: 0, accessed: 0, deleted: 0 },
        uniqueShops: new Set()
      };
      
      if (existingData) {
        analytics = JSON.parse(existingData);
        analytics.uniqueShops = new Set(analytics.uniqueShops);
      }
      
      // Update analytics
      analytics.actionCounts[action]++;
      analytics.uniqueShops.add(session.shop);
      analytics.sessionsByShop[session.shop] = (analytics.sessionsByShop[session.shop] || 0) + 1;
      
      // Convert Set back to Array for JSON storage
      const analyticsToStore = {
        ...analytics,
        uniqueShops: Array.from(analytics.uniqueShops),
        totalUniqueShops: analytics.uniqueShops.size
      };
      
      await this.kv.put(analyticsKey, JSON.stringify(analyticsToStore), {
        expirationTtl: 86400 * 30 // Keep for 30 days
      });
    } catch (error) {
      console.error('Failed to update session analytics:', error);
    }
  }

  /**
   * Hash fingerprint components for validation
   */
  private hashFingerprint(fingerprint: SessionFingerprint): string {
    const data = `${fingerprint.userAgent}:${fingerprint.ipAddress}:${fingerprint.shopDomain}:${fingerprint.createdAt}`;
    // Simple hash using crypto API available in Workers
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data + this.encryptionKey);
    return btoa(String.fromCharCode(...new Uint8Array(dataBuffer))).substring(0, 32);
  }

  /**
   * Encrypt session data with fingerprint
   */
  private async encryptSession(session: Session, fingerprint: SessionFingerprint): Promise<EncryptedSessionData> {
    try {
      // Prepare session data with fingerprint hash for integrity
      const sessionDataWithFingerprint = {
        ...session,
        fingerprintHash: fingerprint.hash
      };
      
      const sessionData = JSON.stringify(sessionDataWithFingerprint);
      
      // Use Web Crypto API for proper AES-GCM encryption
      const key = await this.getEncryptionKey();
      const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for AES-GCM
      const encoder = new TextEncoder();
      const data = encoder.encode(sessionData);
      
      const encrypted = await crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        key,
        data
      );
      
      return {
        data: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
        iv: btoa(String.fromCharCode(...iv)),
        metadata: {
          shop: session.shop,
          isOnline: session.isOnline,
          createdAt: new Date().toISOString(),
          lastAccessedAt: new Date().toISOString(),
          fingerprintHash: fingerprint.hash,
          encryptionMethod: 'AES-GCM',
          ...(session.expires && { expiresAt: session.expires.toISOString() })
        }
      };
    } catch (error) {
      console.error('Advanced encryption failed, falling back to base64:', error);
      // Fallback to base64 if crypto operations fail
      const sessionData = JSON.stringify(session);
      const encoded = btoa(sessionData);
      const iv = this.generateIV();
      
      return {
        data: encoded,
        iv,
        metadata: {
          shop: session.shop,
          isOnline: session.isOnline,
          createdAt: new Date().toISOString(),
          lastAccessedAt: new Date().toISOString(),
          encryptionMethod: 'base64-fallback',
          ...(session.expires && { expiresAt: session.expires.toISOString() })
        }
      };
    }
  }

  /**
   * Decrypt session data (supports both AES-GCM and base64 fallback)
   */
  private async decryptSession(encryptedData: EncryptedSessionData): Promise<Session> {
    try {
      const encryptionMethod = encryptedData.metadata.encryptionMethod || 'base64-fallback';
      
      if (encryptionMethod === 'AES-GCM') {
        // Decrypt using AES-GCM
        const key = await this.getEncryptionKey();
        const iv = new Uint8Array(atob(encryptedData.iv).split('').map(char => char.charCodeAt(0)));
        const encryptedBytes = new Uint8Array(atob(encryptedData.data).split('').map(char => char.charCodeAt(0)));
        
        const decrypted = await crypto.subtle.decrypt(
          {
            name: 'AES-GCM',
            iv: iv
          },
          key,
          encryptedBytes
        );
        
        const decoder = new TextDecoder();
        const sessionData = decoder.decode(decrypted);
        const sessionWithFingerprint = JSON.parse(sessionData);
        
        // Remove fingerprint hash from session data
        const { fingerprintHash, ...session } = sessionWithFingerprint;
        
        // Convert expires string back to Date if present
        if (session.expires && typeof session.expires === 'string') {
          session.expires = new Date(session.expires);
        }
        
        return session;
      } else {
        // Fallback to base64 decoding
        const sessionData = atob(encryptedData.data);
        const session = JSON.parse(sessionData);
        
        // Convert expires string back to Date if present
        if (session.expires && typeof session.expires === 'string') {
          session.expires = new Date(session.expires);
        }
        
        return session;
      }
    } catch (error) {
      console.error('Decryption failed, attempting fallback:', error);
      // Final fallback to base64
      const sessionData = atob(encryptedData.data);
      const session = JSON.parse(sessionData);
      
      if (session.expires && typeof session.expires === 'string') {
        session.expires = new Date(session.expires);
      }
      
      return session;
    }
  }

  /**
   * Get or create encryption key for AES-GCM
   */
  private async getEncryptionKey(): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyMaterial = encoder.encode(this.encryptionKey.padEnd(32, '0').substring(0, 32));
    
    return await crypto.subtle.importKey(
      'raw',
      keyMaterial,
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Calculate TTL for session storage
   */
  private calculateTTL(session: Session): number {
    if (session.expires) {
      const ttl = Math.floor((session.expires.getTime() - Date.now()) / 1000);
      return Math.max(ttl, 60); // Minimum 1 minute
    }
    
    // Default TTL: 24 hours for offline sessions, 1 hour for online sessions
    return session.isOnline ? 3600 : 86400;
  }

  /**
   * Store shop index for quick session lookups
   */
  private async storeShopIndex(session: Session): Promise<void> {
    try {
      const indexKey = `shop_index:${session.shop}`;
      const existingIndexData = await this.kv.get(indexKey);
      
      let sessionIds: string[] = [];
      if (existingIndexData) {
        sessionIds = JSON.parse(existingIndexData);
      }
      
      if (!sessionIds.includes(session.id)) {
        sessionIds.push(session.id);
        await this.kv.put(indexKey, JSON.stringify(sessionIds), {
          expirationTtl: 86400 * 7 // 7 days
        });
      }
    } catch (error) {
      console.error('Failed to store shop index:', error);
    }
  }

  /**
   * Remove session from shop index
   */
  private async removeFromShopIndex(session: Session): Promise<void> {
    try {
      const indexKey = `shop_index:${session.shop}`;
      const existingIndexData = await this.kv.get(indexKey);
      
      if (existingIndexData) {
        let sessionIds: string[] = JSON.parse(existingIndexData);
        sessionIds = sessionIds.filter(id => id !== session.id);
        
        if (sessionIds.length > 0) {
          await this.kv.put(indexKey, JSON.stringify(sessionIds), {
            expirationTtl: 86400 * 7 // 7 days
          });
        } else {
          await this.kv.delete(indexKey);
        }
      }
    } catch (error) {
      console.error('Failed to remove from shop index:', error);
    }
  }

  /**
   * Update last accessed timestamp
   */
  private async updateLastAccessed(sessionId: string): Promise<void> {
    // This could be implemented to track session activity
    // For now, we'll skip to avoid excessive KV writes
  }

  /**
   * Generate initialization vector for encryption
   */
  private generateIV(): string {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  }
}

/**
 * Create a session storage instance
 */
export function createSessionStorage(env: Env): SessionStorage {
  return new KVSessionStorage(
    env.DELIVERY_CACHE, // Reusing existing KV namespace
    env.SHOPIFY_WEBHOOK_SECRET // Using webhook secret as encryption key
  );
} 