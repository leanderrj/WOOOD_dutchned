import { Env, parseEnvironment } from './types/env';
import { handleHealthCheck } from './handlers/health';
import { handleDeliveryDates } from './handlers/deliveryDates';
import { handleShippingMethods } from './handlers/shippingMethods';
import { handleOrderMetafields } from './handlers/orderMetafields';
import { handleErrorTracking } from './handlers/errorTracking';
import { createLogger } from './utils/logger';
import { createFeatureFlagsService } from './services/featureFlagsService';
import { createRateLimitingService, RateLimiter } from './services/rateLimitingService';



/**
 * Main worker entry point
 * Handles all incoming requests and routes them to appropriate handlers
 */
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const config = parseEnvironment(env);
    const requestId = crypto.randomUUID();
    const logger = createLogger(env, config);
    const featureFlags = createFeatureFlagsService(env);
    const rateLimitingService = createRateLimitingService(env, config);
    const startTime = Date.now();

    // Log request start
    if (config.features.enableRequestLogging) {
      logger.info('Request received', {
        requestId,
        method: request.method,
        pathname: url.pathname,
        userAgent: request.headers.get('User-Agent')?.substring(0, 100) || 'unknown',
        origin: request.headers.get('Origin') || 'unknown',
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
 * Export the enhanced RateLimiter Durable Object
 */
export { RateLimiter };

/**
 * Export types for use in other modules
 */
export type { Env, WorkerConfig } from './types/env'; 