import { Env, parseEnvironment } from './types/env';
import { handleHealthCheck } from './handlers/health';
import { handleDeliveryDates } from './handlers/deliveryDates';
import { handleShippingMethods } from './handlers/shippingMethods';
import { handleOrderMetafields } from './handlers/orderMetafields';
import { handleErrorTracking } from './handlers/errorTracking';
import { WorkersLogger } from './utils/logger';

/**
 * RateLimiter Durable Object class
 * Enhanced implementation for rate limiting functionality
 */
export class RateLimiter {
  constructor(private state: DurableObjectState, private env: Env) {}

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const clientId = this.getClientId(request);
    const currentTime = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const limit = 100; // 100 requests per window
    const windowStart = currentTime - windowMs;

    try {
      // Get request history from Durable Object storage
      const requests = await this.state.storage.get<number[]>(clientId) || [];

      // Filter requests within current window
      const recentRequests = requests.filter(time => time > windowStart);

      // Check if limit exceeded
      if (recentRequests.length >= limit) {
        return new Response(JSON.stringify({
          allowed: false,
          limit,
          remaining: 0,
          resetTime: windowStart + windowMs,
          retryAfter: Math.ceil((windowStart + windowMs - currentTime) / 1000)
        }), {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': Math.ceil((windowStart + windowMs) / 1000).toString(),
            'Retry-After': Math.ceil((windowStart + windowMs - currentTime) / 1000).toString()
          }
        });
      }

      // Add current request and save
      recentRequests.push(currentTime);
      await this.state.storage.put(clientId, recentRequests);

      return new Response(JSON.stringify({
        allowed: true,
        limit,
        remaining: limit - recentRequests.length,
        resetTime: windowStart + windowMs
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': (limit - recentRequests.length).toString(),
          'X-RateLimit-Reset': Math.ceil((windowStart + windowMs) / 1000).toString()
        }
      });

    } catch (error: any) {
      // Allow request on storage errors to avoid blocking legitimate traffic
      return new Response(JSON.stringify({
        allowed: true,
        limit,
        remaining: limit - 1,
        resetTime: windowStart + windowMs,
        error: 'Rate limiter storage error'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Error': 'storage-error'
        }
      });
    }
  }

  /**
   * Extract client identifier for rate limiting
   */
  private getClientId(request: Request): string {
    // Use CF-Connecting-IP header if available, fallback to various other headers
    const headers = request.headers;
    const ip = headers.get('CF-Connecting-IP') || 
               headers.get('X-Forwarded-For')?.split(',')[0] || 
               headers.get('X-Real-IP') ||
               'unknown';
    
    // Combine IP with User-Agent for more specific rate limiting
    const userAgent = headers.get('User-Agent')?.substring(0, 50) || 'unknown';
    
    return `${ip}:${userAgent}`;
  }
}

/**
 * Main worker entry point
 * Handles all incoming requests and routes them to appropriate handlers
 */
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const config = parseEnvironment(env);
    const requestId = crypto.randomUUID();
    const logger = new WorkersLogger(env, config);
    const startTime = Date.now();

    // Log request start
    if (config.features.enableRequestLogging) {
      logger.info('Request received', {
        requestId,
        method: request.method,
        pathname: url.pathname,
        userAgent: request.headers.get('User-Agent')?.substring(0, 100),
        origin: request.headers.get('Origin'),
        timestamp: new Date().toISOString()
      });
    }

    // Basic CORS headers (use Record to allow additional properties)
    const corsHeaders: Record<string, string> = {
      'Access-Control-Allow-Origin': '*', // Will be refined based on configuration
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400',
    };

    try {
      // Handle CORS preflight requests
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: corsHeaders
        });
      }

      // Rate limiting check (if enabled)
      if (config.features.enableRateLimiting && env.RATE_LIMITER) {
        try {
          const rateLimiterId = env.RATE_LIMITER.idFromName('global');
          const rateLimiterObj = env.RATE_LIMITER.get(rateLimiterId);
          const rateLimitResponse = await rateLimiterObj.fetch(request);
          const rateLimitData = await rateLimitResponse.json() as any;

          if (!rateLimitData.allowed) {
            const errorResponse = {
              success: false,
              error: 'RATE_LIMIT_EXCEEDED',
              message: 'Too many requests. Please try again later.',
              requestId,
              timestamp: new Date().toISOString(),
              retryAfter: rateLimitData.retryAfter
            };

            return new Response(JSON.stringify(errorResponse), {
              status: 429,
              headers: {
                ...corsHeaders,
                'Content-Type': 'application/json',
                'X-RateLimit-Limit': rateLimitResponse.headers.get('X-RateLimit-Limit') || '100',
                'X-RateLimit-Remaining': '0',
                'X-RateLimit-Reset': rateLimitResponse.headers.get('X-RateLimit-Reset') || '',
                'Retry-After': rateLimitData.retryAfter?.toString() || '900'
              }
            });
          }

          // Add rate limit headers to successful responses
          corsHeaders['X-RateLimit-Limit'] = rateLimitResponse.headers.get('X-RateLimit-Limit') || '100';
          corsHeaders['X-RateLimit-Remaining'] = rateLimitResponse.headers.get('X-RateLimit-Remaining') || '99';
          corsHeaders['X-RateLimit-Reset'] = rateLimitResponse.headers.get('X-RateLimit-Reset') || '';

        } catch (rateLimitError: any) {
          // Log rate limiting error but continue with request
          logger.warn('Rate limiting check failed, allowing request', {
            requestId,
            error: rateLimitError.message,
            pathname: url.pathname
          });
        }
      }

      // Route requests to appropriate handlers
      let response: Response;

      if (url.pathname === '/health') {
        response = await handleHealthCheck(env, config, logger, requestId);
      } else if (url.pathname === '/api/delivery-dates/available') {
        response = await handleDeliveryDates(request, env, config, logger, requestId);
      } else if (url.pathname.startsWith('/api/shipping-methods/')) {
        response = await handleShippingMethods(request, env, config, logger, requestId);
      } else if (url.pathname === '/api/order-metafields/save') {
        response = await handleOrderMetafields(request, env, config, logger, requestId);
      } else if (url.pathname === '/api/errors/track') {
        response = await handleErrorTracking(request, env, config, logger, requestId);
      } else {
        // 404 for unknown routes
        const notFoundResponse = {
          success: false,
          error: 'NOT_FOUND',
          message: `Endpoint ${url.pathname} not found`,
          requestId,
          timestamp: new Date().toISOString(),
          availableEndpoints: [
            '/health',
            '/api/delivery-dates/available',
            '/api/shipping-methods/process',
            '/api/shipping-methods/{id}',
            '/api/order-metafields/save',
            '/api/errors/track'
          ]
        };

        response = new Response(JSON.stringify(notFoundResponse), {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      // Add CORS headers to all responses
      const finalHeaders = new Headers(response.headers);
      Object.entries(corsHeaders).forEach(([key, value]) => {
        finalHeaders.set(key, value);
      });

      // Add performance monitoring headers if enabled
      if (config.features.enablePerformanceMonitoring) {
        const executionTime = Date.now() - startTime;
        finalHeaders.set('X-Response-Time', `${executionTime}ms`);
        finalHeaders.set('X-Worker-Version', '1.0.0');
        finalHeaders.set('X-Environment', config.environment);
      }

      // Log response
      if (config.features.enableRequestLogging) {
        const executionTime = Date.now() - startTime;
        logger.info('Request completed', {
          requestId,
          method: request.method,
          pathname: url.pathname,
          status: response.status,
          executionTime,
          cached: response.headers.get('X-Cache-Status') === 'HIT'
        });
      }

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: finalHeaders
      });

    } catch (error: any) {
      const executionTime = Date.now() - startTime;
      
      logger.error('Unhandled worker error', {
        requestId,
        error: error.message,
        errorStack: error.stack,
        executionTime,
        method: request.method,
        pathname: url.pathname
      });

      const errorResponse = {
        success: false,
        error: 'INTERNAL_ERROR',
        message: config.features.enableDetailedErrors 
          ? error.message 
          : 'An unexpected error occurred',
        requestId,
        timestamp: new Date().toISOString()
      };

      return new Response(JSON.stringify(errorResponse), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          ...(config.features.enablePerformanceMonitoring && {
            'X-Response-Time': `${executionTime}ms`
          })
        }
      });
    }
  }
};

/**
 * Export types for use in other modules
 */
export type { Env, WorkerConfig } from './types/env'; 