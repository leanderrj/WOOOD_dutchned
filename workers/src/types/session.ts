/**
 * Session types for Shopify OAuth implementation
 * Following @shopify/shopify-api patterns for Cloudflare Workers
 */

/**
 * Shopify session interface compatible with @shopify/shopify-api
 */
export interface Session {
  /** Unique session identifier */
  id: string;
  
  /** Shop domain (e.g., 'shop.myshopify.com') */
  shop: string;
  
  /** OAuth state parameter for CSRF protection */
  state: string;
  
  /** Whether this is an online or offline session */
  isOnline: boolean;
  
  /** OAuth access token */
  accessToken?: string;
  
  /** Session expiration date (for online sessions) */
  expires?: Date;
  
  /** OAuth scopes granted to this session */
  scope?: string;
  
  /** User ID (for online sessions) */
  onlineAccessInfo?: {
    expires_in?: number;
    associated_user_scope?: string;
    associated_user?: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      email_verified: boolean;
      account_owner: boolean;
      locale: string;
      collaborator: boolean;
    };
  };
}

/**
 * Session storage interface for KV-backed storage
 */
export interface SessionStorage {
  /**
   * Store a session in KV storage
   * @param session - The session to store
   * @param request - Optional request for fingerprinting
   * @returns Promise that resolves to true if successful
   */
  storeSession(session: Session, request?: Request): Promise<boolean>;
  
  /**
   * Load a session from KV storage
   * @param id - The session ID to load
   * @param request - Optional request for fingerprint validation
   * @returns Promise that resolves to the session or undefined if not found
   */
  loadSession(id: string, request?: Request): Promise<Session | undefined>;
  
  /**
   * Delete a session from KV storage
   * @param id - The session ID to delete
   * @returns Promise that resolves to true if successful
   */
  deleteSession(id: string): Promise<boolean>;
  
  /**
   * Delete sessions by shop domain
   * @param shop - The shop domain
   * @returns Promise that resolves to number of deleted sessions
   */
  deleteSessionsByShop(shop: string): Promise<number>;
  
  /**
   * Find sessions by shop domain
   * @param shop - The shop domain
   * @returns Promise that resolves to array of sessions
   */
  findSessionsByShop(shop: string): Promise<Session[]>;
}

/**
 * Encrypted session data structure for KV storage
 */
export interface EncryptedSessionData {
  /** Encrypted session data */
  data: string;
  
  /** Initialization vector for decryption */
  iv: string;
  
  /** Session metadata (not encrypted) */
  metadata: {
    shop: string;
    isOnline: boolean;
    createdAt: string;
    lastAccessedAt: string;
    expiresAt?: string;
    fingerprintHash?: string;
    encryptionMethod?: 'AES-GCM' | 'base64-fallback';
  };
}

/**
 * Session validation result
 */
export interface SessionValidationResult {
  /** Whether the session is valid */
  isValid: boolean;
  
  /** The validated session (if valid) */
  session?: Session;
  
  /** Error message (if invalid) */
  error?: string;
  
  /** Whether the session has expired */
  isExpired?: boolean;
  
  /** Whether the session needs refresh */
  needsRefresh?: boolean;
}

/**
 * OAuth callback result from Shopify
 */
export interface OAuthCallbackResult {
  /** The authenticated session */
  session: Session;
  
  /** Whether this is a new installation */
  isNewInstallation: boolean;
  
  /** Previous session (if any) */
  previousSession?: Session;
}

/**
 * Session analytics data
 */
export interface SessionAnalytics {
  /** Total number of active sessions */
  totalSessions: number;
  
  /** Number of sessions by shop */
  sessionsByShop: Record<string, number>;
  
  /** Number of online vs offline sessions */
  onlineVsOffline: {
    online: number;
    offline: number;
  };
  
  /** Session expiration statistics */
  expirationStats: {
    expired: number;
    expiringSoon: number; // Within 24 hours
    healthy: number;
  };
  
  /** Last analytics calculation time */
  calculatedAt: string;
} 