import { Env, parseEnvironment } from './types/env';

/**
 * RateLimiter Durable Object class
 * Simple implementation for rate limiting functionality
 */
export class RateLimiter {
  constructor(private state: DurableObjectState, private env: Env) {}

  async fetch(request: Request): Promise<Response> {
    // Basic rate limiting implementation
    // This will be enhanced in Sprint 10
    return new Response(JSON.stringify({ 
      allowed: true, 
      limit: 100, 
      remaining: 99,
      resetTime: Date.now() + 900000 // 15 minutes
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Main worker entry point
 * Handles all incoming requests and routes them to appropriate handlers
 */
export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const config = parseEnvironment(env);

    // Generate request ID for tracking
    const requestId = crypto.randomUUID();
    
    // Basic CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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

      // Route requests to appropriate handlers
      let response: Response;

      if (url.pathname === '/health') {
        // Health check endpoint
        response = new Response(
          JSON.stringify({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            requestId,
            version: '1.0.0',
            environment: config.environment
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      } else if (url.pathname === '/api/delivery-dates/available') {
        // Delivery dates endpoint - placeholder implementation
        response = new Response(
          JSON.stringify({
            success: true,
            data: [
              {
                date: '2024-01-16',
                displayName: 'dinsdag 16 januari'
              },
              {
                date: '2024-01-17',
                displayName: 'woensdag 17 januari'
              }
            ],
            cached: false,
            source: 'worker-placeholder',
            requestId
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      } else if (url.pathname.startsWith('/api/shipping-methods/')) {
        // Shipping methods endpoint - placeholder implementation
        response = new Response(
          JSON.stringify({
            success: true,
            message: 'Shipping method endpoint - placeholder',
            requestId
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      } else if (url.pathname === '/api/order-metafields/save') {
        // Order metafields endpoint - placeholder implementation
        response = new Response(
          JSON.stringify({
            success: true,
            message: 'Order metafields saved - placeholder',
            requestId
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      } else if (url.pathname === '/api/errors/track') {
        // Error tracking endpoint - placeholder implementation
        response = new Response(
          JSON.stringify({
            success: true,
            message: 'Error tracked - placeholder',
            requestId
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      } else {
        // Handle 404 - Not Found
        response = new Response(
          JSON.stringify({
            error: 'Not Found',
            message: 'The requested endpoint does not exist',
            path: url.pathname,
            requestId,
            timestamp: new Date().toISOString()
          }),
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      }

      // Add CORS headers to all responses
      const responseHeaders = new Headers(response.headers);
      Object.entries(corsHeaders).forEach(([key, value]) => {
        responseHeaders.set(key, value);
      });

      // Add performance headers if enabled
      if (config.features.enablePerformanceMonitoring) {
        responseHeaders.set('X-Request-ID', requestId);
        responseHeaders.set('X-Worker-Version', '1.0.0');
      }

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders
      });

    } catch (error: any) {
      // Handle unexpected errors
      const errorId = crypto.randomUUID();
      
      console.error('Unhandled worker error:', {
        requestId,
        errorId,
        error: error.message,
        stack: error.stack,
        pathname: url.pathname,
        method: request.method,
        timestamp: new Date().toISOString()
      });

      // Return generic error response
      const errorResponse = {
        error: 'Internal Server Error',
        message: config.features.enableDetailedErrors 
          ? error.message 
          : 'An unexpected error occurred',
        errorId,
        requestId,
        timestamp: new Date().toISOString()
      };

      return new Response(JSON.stringify(errorResponse), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
  }
};

/**
 * Export types for use in other modules
 */
export type { Env, WorkerConfig } from './types/env'; 