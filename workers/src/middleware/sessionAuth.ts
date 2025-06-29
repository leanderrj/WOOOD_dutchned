/**
 * Session authentication middleware for Cloudflare Workers
 * Task 10.6: Session Middleware
 */

import { Env, WorkerConfig } from '../types/env';
import { WorkersLogger } from '../utils/logger';
import { createOAuthService } from '../services/shopifyOAuthService';
import { Session } from '../types/session';

/**
 * Extended request interface with session context
 */
export interface SessionRequest extends Request {
  session?: Session;
  shopDomain?: string | null;
  sessionId?: string;
  isAuthenticated?: boolean;
}

/**
 * Session authentication result
 */
export interface SessionAuthResult {
  success: boolean;
  session?: Session;
  error?: string;
  needsReauth?: boolean;
  shopDomain?: string | null | undefined;
}

/**
 * Session middleware for protecting routes
 */
export async function sessionAuthMiddleware(
  request: Request,
  env: Env,
  config: WorkerConfig,
  logger: WorkersLogger,
  requestId: string
): Promise<SessionAuthResult> {
  try {
    const url = new URL(request.url);
    
    // Extract session information from different sources
    const sessionId = extractSessionId(request);
    const shopDomain = extractShopDomain(request);

    logger.info('Session authentication attempt', {
      requestId,
      hasSessionId: !!sessionId,
      shopDomain,
      path: url.pathname,
      method: request.method
    });

    // If no session identifier found, return unauthorized
    if (!sessionId && !shopDomain) {
      return {
        success: false,
        error: 'No session identifier found',
        needsReauth: true
      };
    }

    // Create OAuth service for session validation
    const oauthService = createOAuthService(env, config);

    let session: Session | null = null;

    // Try to load session by ID
    if (sessionId) {
      session = await oauthService.validateSession(sessionId);
      if (session) {
        logger.info('Session loaded successfully', {
          requestId,
          sessionId,
          shop: session.shop,
          isOnline: session.isOnline
        });
      }
    }

    // If no session found by ID, try to find by shop domain
    if (!session && shopDomain) {
      const sessionStorage = createOAuthService(env, config);
      // Note: This would need to be implemented in the OAuth service
      logger.info('Attempting shop-based session lookup', {
        requestId,
        shopDomain
      });
    }

    // If still no session, require authentication
    if (!session) {
      logger.warn('No valid session found', {
        requestId,
        sessionId: sessionId ?? undefined,
        shopDomain: shopDomain ?? undefined
      });

             return {
         success: false,
         error: 'Invalid or expired session',
         needsReauth: true,
         ...(shopDomain && { shopDomain })
       };
    }

    // Validate session is not expired
    if (session.expires && session.expires < new Date()) {
      logger.warn('Session expired', {
        requestId,
        sessionId: session.id,
        shop: session.shop,
        expiredAt: session.expires
      });

      return {
        success: false,
        error: 'Session has expired',
        needsReauth: true,
        shopDomain: session.shop
      };
    }

    // Session is valid
    return {
      success: true,
      session,
      shopDomain: session.shop
    };

  } catch (error) {
    logger.error('Session authentication failed', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return {
      success: false,
      error: 'Session authentication failed',
      needsReauth: true
    };
  }
}

/**
 * Create authenticated request with session context
 */
export function createAuthenticatedRequest(
  request: Request,
  session: Session
): SessionRequest {
  const sessionRequest = request as SessionRequest;
  sessionRequest.session = session;
  sessionRequest.shopDomain = session.shop;
  sessionRequest.sessionId = session.id;
  sessionRequest.isAuthenticated = true;
  
  return sessionRequest;
}

/**
 * Middleware for API routes that require authentication
 */
export async function requireAuthentication(
  request: Request,
  env: Env,
  config: WorkerConfig,
  logger: WorkersLogger,
  requestId: string
): Promise<Response | SessionRequest> {
  const authResult = await sessionAuthMiddleware(request, env, config, logger, requestId);

  if (!authResult.success) {
    logger.warn('Authentication required', {
      requestId,
      error: authResult.error,
      needsReauth: authResult.needsReauth,
      shopDomain: authResult.shopDomain
    });

    // Return authentication error response
    return new Response(
      JSON.stringify({
        error: 'Authentication required',
        message: authResult.error || 'Valid session required',
        needsReauth: authResult.needsReauth,
        shopDomain: authResult.shopDomain,
        authUrl: authResult.shopDomain ? `/auth/start?shop=${encodeURIComponent(authResult.shopDomain)}` : '/auth/start'
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'WWW-Authenticate': 'Bearer realm="Shopify App"'
        }
      }
    );
  }

  // Create authenticated request
  return createAuthenticatedRequest(request, authResult.session!);
}

/**
 * Extract session ID from request
 */
function extractSessionId(request: Request): string | null {
  // Try different sources for session ID
  
  // 1. Authorization header (Bearer token)
  const authHeader = request.headers.get('Authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // 2. X-Session-ID header
  const sessionHeader = request.headers.get('X-Session-ID');
  if (sessionHeader) {
    return sessionHeader;
  }

  // 3. Query parameter
  const url = new URL(request.url);
  const sessionParam = url.searchParams.get('session_id');
  if (sessionParam) {
    return sessionParam;
  }

  // 4. Cookie (if applicable)
  const cookieHeader = request.headers.get('Cookie');
  if (cookieHeader) {
    const cookies = parseCookies(cookieHeader);
    const sessionCookie = cookies['woood_session_id'];
    if (sessionCookie) {
      return sessionCookie;
    }
  }

  return null;
}

/**
 * Extract shop domain from request
 */
function extractShopDomain(request: Request): string | null {
  // 1. X-Shopify-Shop-Domain header
  const shopHeader = request.headers.get('X-Shopify-Shop-Domain');
  if (shopHeader) {
    return shopHeader;
  }

  // 2. Query parameter
  const url = new URL(request.url);
  const shopParam = url.searchParams.get('shop');
  if (shopParam) {
    return shopParam;
  }

  // 3. Referer header (extract from Shopify admin)
  const referer = request.headers.get('Referer');
  if (referer) {
    const match = referer.match(/https:\/\/([^.]+\.myshopify\.com)/);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Parse cookies from cookie header
 */
function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.trim().split('=');
    if (name && rest.length > 0) {
      cookies[name] = rest.join('=');
    }
  });
  
  return cookies;
}

/**
 * Create authenticated API client helpers
 */
export class AuthenticatedAPIClient {
  constructor(
    private session: Session,
    private config: WorkerConfig
  ) {}

  /**
   * Make authenticated GraphQL request
   */
  async graphQL(query: string, variables?: any): Promise<any> {
    const response = await fetch(`https://${this.session.shop}/admin/api/${this.config.shopifyOAuth.apiVersion}/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': this.session.accessToken || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Make authenticated REST API request
   */
  async rest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `https://${this.session.shop}/admin/api/${this.config.shopifyOAuth.apiVersion}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'X-Shopify-Access-Token': this.session.accessToken || '',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`REST request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Get shop information
   */
  async getShop(): Promise<any> {
    return await this.rest('/shop.json');
  }

  /**
   * Get products
   */
  async getProducts(limit: number = 50): Promise<any> {
    return await this.rest(`/products.json?limit=${limit}`);
  }

  /**
   * Get orders
   */
  async getOrders(limit: number = 50): Promise<any> {
    return await this.rest(`/orders.json?limit=${limit}`);
  }

  /**
   * Create order metafield
   */
  async createOrderMetafield(orderId: string, key: string, value: string, type: string = 'single_line_text_field'): Promise<any> {
    const metafield = {
      metafield: {
        namespace: 'woood_delivery',
        key,
        value,
        type,
      },
    };

    return await this.rest(`/orders/${orderId}/metafields.json`, {
      method: 'POST',
      body: JSON.stringify(metafield),
    });
  }
}

/**
 * Create authenticated API client from request
 */
export function createAuthenticatedClient(
  request: SessionRequest,
  config: WorkerConfig
): AuthenticatedAPIClient {
  if (!request.session) {
    throw new Error('Request must be authenticated to create API client');
  }

  return new AuthenticatedAPIClient(request.session, config);
}

/**
 * Session-based route protection decorator
 */
export function requireSession() {
  return function(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function(
      request: Request,
      env: Env,
      config: WorkerConfig,
      logger: WorkersLogger,
      requestId: string,
      ...args: any[]
    ) {
      // Check if request is already authenticated
      const sessionRequest = request as SessionRequest;
      if (!sessionRequest.isAuthenticated || !sessionRequest.session) {
        const authResult = await requireAuthentication(request, env, config, logger, requestId);
        
        // If authentication failed, return the error response
        if (authResult instanceof Response) {
          return authResult;
        }

        // Update the request with session context
        Object.assign(request, authResult);
      }

      // Call the original method with authenticated request
      return await method.call(this, request, env, config, logger, requestId, ...args);
    };

    return descriptor;
  };
} 