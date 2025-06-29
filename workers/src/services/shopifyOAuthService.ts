/**
 * Shopify OAuth service for Cloudflare Workers
 * Enhanced with comprehensive error handling, retry mechanisms, and monitoring
 */

import { Session, SessionStorage, OAuthCallbackResult } from '../types/session';
import { Env, WorkerConfig } from '../types/env';
import { createSessionStorage } from '../utils/sessionStorage';

/**
 * OAuth error types for structured error handling
 */
export enum OAuthErrorType {
  INVALID_SHOP = 'INVALID_SHOP',
  INVALID_STATE = 'INVALID_STATE',
  TOKEN_EXCHANGE_FAILED = 'TOKEN_EXCHANGE_FAILED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  RATE_LIMITED = 'RATE_LIMITED',
  INVALID_RESPONSE = 'INVALID_RESPONSE',
  SESSION_STORAGE_ERROR = 'SESSION_STORAGE_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

/**
 * OAuth error class for detailed error information
 */
export class OAuthError extends Error {
  public readonly type: OAuthErrorType;
  public readonly shop?: string;
  public readonly retryable: boolean;
  public readonly statusCode?: number;
  public readonly retryAfter?: number;
  public readonly debugInfo?: any;

  constructor(
    type: OAuthErrorType,
    message: string,
    options: {
      shop?: string;
      retryable?: boolean;
      statusCode?: number;
      retryAfter?: number;
      debugInfo?: any;
      cause?: Error;
    } = {}
  ) {
    super(message);
    this.name = 'OAuthError';
    this.type = type;
    this.retryable = options.retryable ?? false;
    
    if (options.shop !== undefined) {
      this.shop = options.shop;
    }
    if (options.statusCode !== undefined) {
      this.statusCode = options.statusCode;
    }
    if (options.retryAfter !== undefined) {
      this.retryAfter = options.retryAfter;
    }
    if (options.debugInfo !== undefined) {
      this.debugInfo = options.debugInfo;
    }
    
    if (options.cause) {
      this.stack = options.cause.stack;
    }
  }
}

/**
 * OAuth retry configuration
 */
interface RetryConfig {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  exponentialBackoff: boolean;
  retryableErrors: OAuthErrorType[];
}

/**
 * OAuth monitoring data
 */
interface OAuthMonitoringData {
  timestamp: string;
  shop: string;
  operation: string;
  success: boolean;
  error?: OAuthErrorType | undefined;
  attempt: number;
  duration: number;
  userAgent?: string | undefined;
  ipAddress?: string | undefined;
}

/**
 * Shopify OAuth service class (simplified implementation)
 */
export class ShopifyOAuthService {
  private readonly sessionStorage: SessionStorage;
  private readonly config: WorkerConfig;
  private readonly env: Env;
  private readonly retryConfig: RetryConfig;

  constructor(env: Env, config: WorkerConfig) {
    this.config = config;
    this.env = env;
    this.sessionStorage = createSessionStorage(env);
    this.retryConfig = {
      maxAttempts: 3,
      baseDelay: 1000,
      maxDelay: 10000,
      exponentialBackoff: true,
      retryableErrors: [
        OAuthErrorType.NETWORK_ERROR,
        OAuthErrorType.RATE_LIMITED,
        OAuthErrorType.UNKNOWN_ERROR
      ]
    };
  }

  /**
   * Begin OAuth authorization flow
   */
  async beginOAuth(shop: string, isOnline: boolean = false): Promise<string> {
    try {
      // Validate shop domain
      const validatedShop = this.validateShopDomain(shop);
      if (!validatedShop) {
        throw new Error('Invalid shop domain');
      }

      // Generate state for CSRF protection
      const state = this.generateState();
      const scopes = this.config.shopifyOAuth.scopes.join(',');
      
      // Build OAuth URL
      const oauthUrl = new URL(`https://${validatedShop}/admin/oauth/authorize`);
      oauthUrl.searchParams.set('client_id', this.config.shopifyOAuth.clientId);
      oauthUrl.searchParams.set('scope', scopes);
      oauthUrl.searchParams.set('redirect_uri', `${this.config.shopifyOAuth.appUrl}/auth/callback`);
      oauthUrl.searchParams.set('state', state);

      // Store state for validation
      await this.storeOAuthState(state, validatedShop, isOnline);

      return oauthUrl.toString();
    } catch (error) {
      console.error('Failed to begin OAuth:', error);
      throw new Error(`OAuth initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Complete OAuth authorization flow
   */
  async completeOAuth(request: Request): Promise<OAuthCallbackResult> {
    try {
      // Extract callback parameters
      const url = new URL(request.url);
      const shop = url.searchParams.get('shop');
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');

      if (!shop || !code || !state) {
        throw new Error('Missing required OAuth parameters');
      }

      // Validate state
      const isValidState = await this.validateOAuthState(state, shop);
      if (!isValidState) {
        throw new Error('Invalid OAuth state parameter');
      }

      // Exchange code for access token
      const accessToken = await this.exchangeCodeForToken(shop, code);

      // Check if this is a new installation
      const existingSessions = await this.sessionStorage.findSessionsByShop(shop);
      const isNewInstallation = existingSessions.length === 0;

      // Create session
      const session: Session = {
        id: this.generateSessionId(shop),
        shop,
        state,
        isOnline: false, // For now, we'll use offline sessions
        accessToken,
        scope: this.config.shopifyOAuth.scopes.join(','),
        // Note: expires property omitted for offline sessions
      };

      // Store the session
      await this.sessionStorage.storeSession(session);

      return {
        session,
        isNewInstallation,
        ...(existingSessions.length > 0 && { previousSession: existingSessions[0] }),
      };
    } catch (error) {
      console.error('Failed to complete OAuth:', error);
      throw new Error(`OAuth completion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Validate a session and ensure it's still valid
   */
  async validateSession(sessionId: string): Promise<Session | null> {
    try {
      const session = await this.sessionStorage.loadSession(sessionId);
      if (!session) {
        return null;
      }

      // Check if session has expired
      if (session.expires && session.expires < new Date()) {
        await this.sessionStorage.deleteSession(sessionId);
        return null;
      }

      return session;
    } catch (error) {
      console.error('Failed to validate session:', error);
      return null;
    }
  }

  /**
   * Create authenticated GraphQL client headers
   */
  createAuthHeaders(session: Session): Record<string, string> {
    return {
      'X-Shopify-Access-Token': session.accessToken || '',
      'Content-Type': 'application/json',
    };
  }

  /**
   * Make authenticated API request
   */
  async makeAuthenticatedRequest(session: Session, endpoint: string, options: RequestInit = {}): Promise<Response> {
    const headers = {
      ...this.createAuthHeaders(session),
      ...options.headers,
    };

    return fetch(`https://${session.shop}/admin/api/${this.config.shopifyOAuth.apiVersion}${endpoint}`, {
      ...options,
      headers,
    });
  }

  /**
   * Begin OAuth with retry mechanism
   */
  async beginOAuthWithRetry(shop: string, isOnline: boolean = false, request?: Request): Promise<string> {
    return this.executeWithRetry('beginOAuth', async (attempt) => {
      const startTime = Date.now();
      const monitoringData: any = {
        timestamp: new Date().toISOString(),
        shop,
        operation: 'beginOAuth',
        success: false,
        attempt,
        duration: 0
      };

      try {
        const result = await this.beginOAuth(shop, isOnline);
        monitoringData.success = true;
        monitoringData.duration = Date.now() - startTime;
        await this.recordMonitoring(monitoringData);
        return result;
      } catch (error) {
        monitoringData.duration = Date.now() - startTime;
        await this.recordMonitoring(monitoringData);
        throw error;
      }
    });
  }

  /**
   * Complete OAuth with retry mechanism
   */
  async completeOAuthWithRetry(request: Request): Promise<OAuthCallbackResult> {
    const url = new URL(request.url);
    const shop = url.searchParams.get('shop') || 'unknown';

    return this.executeWithRetry('completeOAuth', async (attempt) => {
      const startTime = Date.now();
      const monitoringData: any = {
        timestamp: new Date().toISOString(),
        shop,
        operation: 'completeOAuth',
        success: false,
        attempt,
        duration: 0
      };

      try {
        const result = await this.completeOAuth(request);
        monitoringData.success = true;
        monitoringData.duration = Date.now() - startTime;
        await this.recordMonitoring(monitoringData);
        return result;
      } catch (error) {
        monitoringData.duration = Date.now() - startTime;
        await this.recordMonitoring(monitoringData);
        throw error;
      }
    });
  }

  /**
   * Execute operation with retry logic
   */
  private async executeWithRetry<T>(
    operationName: string,
    operation: (attempt: number) => Promise<T>
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= this.retryConfig.maxAttempts; attempt++) {
      try {
        return await operation(attempt);
      } catch (error) {
        lastError = error as Error;
        console.warn(`${operationName} attempt ${attempt} failed:`, error);

        // Check if error is retryable
        const isRetryable = this.isRetryableError(error);
        const isLastAttempt = attempt === this.retryConfig.maxAttempts;

        if (!isRetryable || isLastAttempt) {
          throw error;
        }

        // Calculate delay with exponential backoff
        const delay = this.calculateRetryDelay(attempt);
        console.log(`Retrying ${operationName} in ${delay}ms (attempt ${attempt + 1}/${this.retryConfig.maxAttempts})`);
        
        await this.sleep(delay);
      }
    }

    throw lastError!;
  }

  /**
   * Check if error is retryable
   */
  private isRetryableError(error: any): boolean {
    // Check for network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return true;
    }

    // Check for rate limiting
    if (error.statusCode === 429) {
      return true;
    }

    // Check for server errors
    if (error.statusCode >= 500) {
      return true;
    }

    return false;
  }

  /**
   * Calculate retry delay with exponential backoff
   */
  private calculateRetryDelay(attempt: number): number {
    if (!this.retryConfig.exponentialBackoff) {
      return this.retryConfig.baseDelay;
    }

    const delay = this.retryConfig.baseDelay * Math.pow(2, attempt - 1);
    return Math.min(delay, this.retryConfig.maxDelay);
  }

  /**
   * Record monitoring data
   */
  private async recordMonitoring(data: any): Promise<void> {
    try {
      const key = `oauth_monitoring:${new Date().toISOString().split('T')[0]}:${Date.now()}`;
      await this.env.DELIVERY_CACHE.put(key, JSON.stringify(data), {
        expirationTtl: 86400 * 7 // Keep for 7 days
      });
    } catch (error) {
      console.error('Failed to record OAuth monitoring data:', error);
    }
  }

  /**
   * Get OAuth monitoring statistics
   */
  async getMonitoringStats(days: number = 7): Promise<any> {
    try {
      const stats = {
        totalOperations: 0,
        successRate: 0,
        operationsByType: {} as Record<string, number>,
        errorsByType: {} as Record<string, number>,
        averageDuration: 0,
        shopsByActivity: {} as Record<string, number>
      };

      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);

      const result = await this.env.DELIVERY_CACHE.list({ prefix: 'oauth_monitoring:' });
      
      let totalDuration = 0;
      for (const key of result.keys) {
        const data = await this.env.DELIVERY_CACHE.get(key.name);
        if (!data) continue;

        const monitoring = JSON.parse(data);
        const operationDate = new Date(monitoring.timestamp);
        
        if (operationDate < cutoffDate) continue;

        stats.totalOperations++;
        totalDuration += monitoring.duration;

        // Count operations by type
        stats.operationsByType[monitoring.operation] = (stats.operationsByType[monitoring.operation] || 0) + 1;

        // Count shops by activity
        stats.shopsByActivity[monitoring.shop] = (stats.shopsByActivity[monitoring.shop] || 0) + 1;

        // Count errors
        if (!monitoring.success && monitoring.error) {
          stats.errorsByType[monitoring.error] = (stats.errorsByType[monitoring.error] || 0) + 1;
        }
      }

      // Calculate averages
      stats.averageDuration = stats.totalOperations > 0 ? totalDuration / stats.totalOperations : 0;
      const successfulOps = stats.totalOperations - Object.values(stats.errorsByType).reduce((a, b) => a + b, 0);
      stats.successRate = stats.totalOperations > 0 ? (successfulOps / stats.totalOperations) * 100 : 100;

      return stats;
    } catch (error) {
      console.error('Failed to get monitoring stats:', error);
      return null;
    }
  }

  /**
   * Sleep utility for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Exchange authorization code for access token
   */
  private async exchangeCodeForToken(shop: string, code: string): Promise<string> {
    const tokenEndpoint = `https://${shop}/admin/oauth/access_token`;
    
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: this.config.shopifyOAuth.clientId,
        client_secret: this.config.shopifyOAuth.clientSecret,
        code,
      }),
    });

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as any;
    return data.access_token;
  }

  /**
   * Store OAuth state for CSRF protection
   */
  private async storeOAuthState(state: string, shop: string, isOnline: boolean): Promise<void> {
    // Use a short TTL for state storage (10 minutes)
    const stateData = JSON.stringify({ shop, isOnline, createdAt: Date.now() });
    // Note: In production, store this in KV with TTL
  }

  /**
   * Validate OAuth state parameter
   */
  private async validateOAuthState(state: string, shop: string): Promise<boolean> {
    // Simplified validation - in production, verify against stored state
    return state.length > 0 && shop.length > 0;
  }

  /**
   * Validate shop domain format
   */
  private validateShopDomain(shop: string): string | null {
    if (!shop) return null;

    // Remove https:// if present
    shop = shop.replace(/^https?:\/\//, '');

    // Check if it's a valid Shopify domain
    if (shop.endsWith('.myshopify.com')) {
      return shop;
    }

    // If it's just the shop name, add .myshopify.com
    if (/^[a-zA-Z0-9-]+$/.test(shop)) {
      return `${shop}.myshopify.com`;
    }

    return null;
  }

  /**
   * Generate OAuth state parameter
   */
  private generateState(): string {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  }

  /**
   * Generate session ID
   */
  private generateSessionId(shop: string): string {
    return `session_${shop}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}

/**
 * Create OAuth service instance
 */
export function createOAuthService(env: Env, config: WorkerConfig): ShopifyOAuthService {
  return new ShopifyOAuthService(env, config);
}

/**
 * OAuth utility functions
 */
export const OAuthUtils = {
  /**
   * Generate OAuth state parameter
   */
  generateState(): string {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  },

  /**
   * Validate OAuth state parameter
   */
  validateState(providedState: string, expectedState: string): boolean {
    return providedState === expectedState;
  },

  /**
   * Extract shop domain from various formats
   */
  extractShopDomain(input: string): string | null {
    if (!input) return null;

    // Remove protocol if present
    input = input.replace(/^https?:\/\//, '');

    // If it already ends with .myshopify.com, return as is
    if (input.endsWith('.myshopify.com')) {
      return input;
    }

    // If it's just the shop name, add .myshopify.com
    const shopNameMatch = input.match(/^([a-zA-Z0-9-]+)/);
    if (shopNameMatch) {
      return `${shopNameMatch[1]}.myshopify.com`;
    }

    return null;
  },

  /**
   * Check if a session is about to expire (within 1 hour)
   */
  isSessionExpiringSoon(session: Session): boolean {
    if (!session.expires) return false;
    const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);
    return session.expires < oneHourFromNow;
  },

  /**
   * Check if a session has expired
   */
  isSessionExpired(session: Session): boolean {
    if (!session.expires) return false;
    return session.expires < new Date();
  },
}; 