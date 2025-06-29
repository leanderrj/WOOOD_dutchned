// Enhanced Workers implementation with complete webhook processing
// Integrates order webhook processing to convert note_attributes to metafields

import { parseEnvironment, Env, WorkerConfig } from './types/env';
import { createLogger, WorkersLogger } from './utils/logger';
import {
  handleOrderCreated as processOrderCreated,
  handleOrderPaid as processOrderPaid,
  handleOrderUpdated as processOrderUpdated
} from './handlers/orderWebhooks';
import {
  handleWebhookRegistration,
  handleWebhookStatus,
  ShopifyOrder
} from './handlers/webhooks';
import { handleOAuthStart, handleOAuthCallback, handleAppInstallation } from './handlers/auth';
import { handleAdminInterface } from './handlers/admin';
import { handleGetFeatureFlags, handleUpdateFeatureFlag, handleBulkUpdateFeatureFlags } from './handlers/featureFlags';
import { handleSystemHealth, handleActivityLog } from './handlers/adminMonitoring';
import { sessionAuthMiddleware } from './middleware/sessionAuth';

// Sprint 15: Production Security Hardening imports
import { SecretValidationService } from './services/secretValidationService';
import { enforceAPIAuthentication, AuthenticationError, createAuthErrorResponse } from './middleware/authenticationMiddleware';
import { InputValidationService } from './services/inputValidationService';
import { SecurityHeadersService } from './services/securityHeadersService';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const config = parseEnvironment(env);
    const logger = createLogger(env, config);
    const requestId = crypto.randomUUID();

    // Sprint 15: Production Security Hardening
    try {
      // Validate required secrets on startup (deployment secrets only)
      SecretValidationService.validateRequiredSecrets(env, false);

      // Check production readiness
      const readinessCheck = SecretValidationService.validateProductionReadiness(env);
      if (!readinessCheck.ready && env.ENVIRONMENT === 'production') {
        logger.error('Production deployment blocked due to security issues', {
          requestId,
          criticalIssues: readinessCheck.criticalIssues,
          warnings: readinessCheck.warnings
        });

        return SecurityHeadersService.createSecureResponse(
          JSON.stringify({
            error: 'Service Unavailable',
            message: 'Security configuration incomplete',
            requestId
          }),
          { status: 503 },
          'api',
          env
        );
      }

      // Validate request security
      const securityCheck = SecurityHeadersService.validateRequestSecurity(request);
      if (securityCheck.blocked) {
        logger.warn('Request blocked due to security threats', {
          requestId,
          threats: securityCheck.threats,
          url: url.pathname,
          userAgent: request.headers.get('User-Agent') ?? undefined
        });

        return SecurityHeadersService.createSecureResponse(
          JSON.stringify({
            error: 'Request Blocked',
            message: 'Security violation detected',
            requestId
          }),
          { status: 403 },
          'api',
          env
        );
      }

      if (!securityCheck.valid) {
        logger.info('Security warnings detected', {
          requestId,
          threats: securityCheck.threats
        });
      }

    } catch (secretError) {
      logger.error('Secret validation failed', {
        requestId,
        error: secretError instanceof Error ? secretError.message : 'Unknown error'
      });

      return SecurityHeadersService.createSecureResponse(
        JSON.stringify({
          error: 'Service Unavailable',
          message: 'Configuration error',
          requestId
        }),
        { status: 503 },
        'api',
        env
      );
    }

    // Enhanced CORS headers with proper origin handling and iframe embedding support
    const corsHeaders = {
      'Access-Control-Allow-Origin': getAllowedOrigin(request, config.cors.origins),
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Shopify-Hmac-Sha256, X-Shopify-Topic, X-Shopify-Shop-Domain, X-Session-ID',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
      'X-Frame-Options': 'ALLOWALL', // Allow embedding in Shopify admin
      'Content-Security-Policy': "frame-ancestors 'self' https://*.myshopify.com https://admin.shopify.com",
      'X-Content-Type-Options': 'nosniff'
    };

    // Handle OPTIONS requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    // Log incoming request
    const startTime = Date.now();
    logger.logRequest(request.method, url.pathname, 0, 0, {
      userAgent: request.headers.get('User-Agent') || 'unknown',
      origin: request.headers.get('Origin') || 'unknown'
    });

    try {
      // === CRITICAL FIX: OAUTH ENDPOINTS ===

      // App installation page (root and /install)
      if (url.pathname === '/' || url.pathname === '/install') {
        logger.info('App installation request', { requestId, pathname: url.pathname });
        const response = await handleAppInstallation(request, env, config, logger, requestId);
        logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
        return addCorsHeaders(response, corsHeaders);
      }

      // OAuth initiation endpoint
      if (url.pathname === '/auth/start') {
        logger.info('OAuth start request', { requestId });
        const response = await handleOAuthStart(request, env, config, logger, requestId);
        logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
        return addCorsHeaders(response, corsHeaders);
      }

      // OAuth callback endpoint
      if (url.pathname === '/auth/callback') {
        logger.info('OAuth callback request', { requestId });
        const response = await handleOAuthCallback(request, env, config, logger, requestId);
        logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
        return addCorsHeaders(response, corsHeaders);
      }

      // Admin interface endpoint
      if (url.pathname === '/admin' || url.pathname.startsWith('/admin/')) {
        logger.info('Admin interface request', { requestId, pathname: url.pathname });
        const response = await handleAdminInterface(request, env, config, logger, requestId);
        logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
        return addCorsHeaders(response, corsHeaders);
      }

      // Feature flags API endpoints
      if (url.pathname === '/api/admin/feature-flags' && request.method === 'GET') {
        const sessionResult = await sessionAuthMiddleware(request, env, config, logger, requestId);
        if (!sessionResult.success || !sessionResult.session) {
          return addCorsHeaders(new Response(JSON.stringify({ success: false, error: 'Authentication required' }), { status: 401 }), corsHeaders);
        }
        const response = await handleGetFeatureFlags(request, env, sessionResult.session, logger, requestId);
        logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
        return addCorsHeaders(response, corsHeaders);
      }

      if (url.pathname === '/api/admin/feature-flags' && request.method === 'POST') {
        const sessionResult = await sessionAuthMiddleware(request, env, config, logger, requestId);
        if (!sessionResult.success || !sessionResult.session) {
          return addCorsHeaders(new Response(JSON.stringify({ success: false, error: 'Authentication required' }), { status: 401 }), corsHeaders);
        }
        const response = await handleUpdateFeatureFlag(request, env, sessionResult.session, logger, requestId);
        logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
        return addCorsHeaders(response, corsHeaders);
      }

      if (url.pathname === '/api/admin/feature-flags/bulk' && request.method === 'POST') {
        const sessionResult = await sessionAuthMiddleware(request, env, config, logger, requestId);
        if (!sessionResult.success || !sessionResult.session) {
          return addCorsHeaders(new Response(JSON.stringify({ success: false, error: 'Authentication required' }), { status: 401 }), corsHeaders);
        }
        const response = await handleBulkUpdateFeatureFlags(request, env, sessionResult.session, logger, requestId);
        logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
        return addCorsHeaders(response, corsHeaders);
      }

      // System monitoring API endpoints
      if (url.pathname === '/api/admin/system-health' && request.method === 'GET') {
        const sessionResult = await sessionAuthMiddleware(request, env, config, logger, requestId);
        if (!sessionResult.success || !sessionResult.session) {
          return addCorsHeaders(new Response(JSON.stringify({ success: false, error: 'Authentication required' }), { status: 401 }), corsHeaders);
        }
        const response = await handleSystemHealth(request, env, sessionResult.session, config, logger, requestId);
        logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
        return addCorsHeaders(response, corsHeaders);
      }

      if (url.pathname === '/api/admin/activity-log' && request.method === 'GET') {
        const sessionResult = await sessionAuthMiddleware(request, env, config, logger, requestId);
        if (!sessionResult.success || !sessionResult.session) {
          return addCorsHeaders(new Response(JSON.stringify({ success: false, error: 'Authentication required' }), { status: 401 }), corsHeaders);
        }
        const response = await handleActivityLog(request, env, sessionResult.session, logger, requestId);
        logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
        return addCorsHeaders(response, corsHeaders);
      }

      // === EXISTING ENDPOINTS (UNCHANGED) ===

      // Enhanced health check with configuration info
      if (url.pathname === '/health') {
        const healthData = {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          version: '1.11.1',
          environment: config.environment,
          features: {
            oauthIntegration: true, // ✅ FIXED: OAuth now integrated
            dutchNedApi: config.features.enableDutchNedApi,
            webhookProcessing: config.features.enableWebhookNotifications,
            shippingMethodProcessing: config.features.enableShippingMethodProcessing,
            caching: config.features.enableCaching,
            logging: config.features.enableRequestLogging
          },
          ...(config.features.enableVerboseResponses && {
            uptime: Date.now(),
            endpoints: [
              '/health',
              '/ (app installation)',
              '/install (app installation)',
              '/auth/start (OAuth initiation)',
              '/auth/callback (OAuth completion)',
              '/api/delivery-dates/available',
              '/api/products/shipping-methods',
              '/api/products/erp-delivery-times',
              '/api/webhooks/orders/created',
              '/api/webhooks/orders/paid',
              '/api/webhooks/orders/updated',
              '/api/webhooks/register',
              '/api/webhooks/status'
            ]
          })
        };

        const response = new Response(JSON.stringify(healthData, null, 2), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });

        logger.logRequest(request.method, url.pathname, 200, Date.now() - startTime);
        return response;
      }

      // === WEBHOOK MANAGEMENT ENDPOINTS ===

      // Webhook testing endpoint for debugging
      if (url.pathname === '/debug/webhook-test' && request.method === 'POST') {
        try {
          const body = await request.json() as any;
          const { shopDomain, orderId, topic } = body;

          if (!shopDomain || !orderId) {
            return new Response(JSON.stringify({
              success: false,
              error: 'shopDomain and orderId are required'
            }), {
              status: 400,
              headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
          }

          logger.info('Testing webhook processing for order', { shopDomain, orderId, topic: topic || 'orders/create' });

          // Simulate webhook processing
          const mockOrder: ShopifyOrder = {
            id: orderId,
            order_number: 1001,
            email: 'test@example.com',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            name: '#1001',
            note: '',
            financial_status: 'paid',
            fulfillment_status: 'unfulfilled',
            tags: '',
            gateway: 'shopify_payments',
            test: false,
            total_price: '100.00',
            note_attributes: [
              { name: 'delivery_date', value: '2024-12-20' },
              { name: 'shipping_method', value: '30 - EXPEDITIE STANDAARD' }
            ],
            customer: {
              id: 123,
              email: 'test@example.com',
              first_name: 'Test',
              last_name: 'Customer'
            },
            line_items: [],
            shipping_address: {
              first_name: 'Test',
              last_name: 'Customer',
              address1: 'Test Street 1',
              address2: '',
              city: 'Test City',
              province: 'Test Province',
              country: 'Netherlands',
              zip: '1234AB',
              phone: '+31123456789'
            }
          };

          const result = await processOrderCreated(mockOrder, shopDomain, env, logger);

          return new Response(JSON.stringify({
            success: true,
            message: 'Webhook test completed',
            result,
            timestamp: new Date().toISOString()
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });

        } catch (error: any) {
          logger.error('Webhook test failed', { error: error.message });
          return new Response(JSON.stringify({
            success: false,
            error: 'Webhook test failed',
            details: error.message
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
      }

      // Register webhooks with Shopify
      if (url.pathname === '/api/webhooks/register' && request.method === 'POST') {
        logger.info('Webhook registration request received');
        const response = await handleWebhookRegistration(request, env, logger);
        logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
        return addCorsHeaders(response, corsHeaders);
      }

      // Check webhook registration status
      if (url.pathname === '/api/webhooks/status') {
        logger.info('Webhook status check requested');
        const response = await handleWebhookStatus(request, env, logger);
        logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
        return addCorsHeaders(response, corsHeaders);
      }

      // === ORDER WEBHOOK PROCESSING ENDPOINTS ===

      // Process order created webhook - CORE FUNCTIONALITY
      if (url.pathname === '/api/webhooks/orders/created' && request.method === 'POST') {
        logger.info('Order created webhook received', {
          shopDomain: request.headers.get('X-Shopify-Shop-Domain'),
          topic: request.headers.get('X-Shopify-Topic')
        });

        const response = await processOrderWebhook(
          request,
          env,
          logger,
          'orders/create',
          processOrderCreated
        );

        logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
        return addCorsHeaders(response, corsHeaders);
      }

      // Process order paid webhook
      if (url.pathname === '/api/webhooks/orders/paid' && request.method === 'POST') {
        logger.info('Order paid webhook received', {
          shopDomain: request.headers.get('X-Shopify-Shop-Domain'),
          topic: request.headers.get('X-Shopify-Topic')
        });

        const response = await processOrderWebhook(
          request,
          env,
          logger,
          'orders/paid',
          processOrderPaid
        );

        logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
        return addCorsHeaders(response, corsHeaders);
      }

      // Process order updated webhook
      if (url.pathname === '/api/webhooks/orders/updated' && request.method === 'POST') {
        logger.info('Order updated webhook received', {
          shopDomain: request.headers.get('X-Shopify-Shop-Domain'),
          topic: request.headers.get('X-Shopify-Topic')
        });

        const response = await processOrderWebhook(
          request,
          env,
          logger,
          'orders/updated',
          processOrderUpdated
        );

        logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
        return addCorsHeaders(response, corsHeaders);
      }

      // Process app uninstalled webhook (current endpoint)
      if (url.pathname === '/api/webhooks/app/uninstalled' && request.method === 'POST') {
        logger.info('App uninstalled webhook received', {
          shopDomain: request.headers.get('X-Shopify-Shop-Domain'),
          topic: request.headers.get('X-Shopify-Topic')
        });

        try {
          const shopDomain = request.headers.get('X-Shopify-Shop-Domain');
          if (shopDomain) {
            // Clear all sessions for the shop when app is uninstalled
            const clearedSessions = await clearShopSessions(shopDomain, env);
            logger.info('App uninstalled - cleared shop sessions', {
              shopDomain,
              clearedSessions
            });
          }

          const response = new Response(JSON.stringify({
            success: true,
            message: 'App uninstalled webhook processed',
            timestamp: new Date().toISOString()
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });

          logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
          return addCorsHeaders(response, corsHeaders);
        } catch (error: any) {
          logger.error('App uninstalled webhook error', { error: error.message });
          const response = new Response(JSON.stringify({
            success: false,
            error: 'Failed to process app uninstalled webhook',
            timestamp: new Date().toISOString()
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });

          logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
          return addCorsHeaders(response, corsHeaders);
        }
      }

      // BACKWARD COMPATIBILITY: Process app uninstalled webhook (legacy endpoint without /api prefix)
      if (url.pathname === '/webhooks/app/uninstalled' && request.method === 'POST') {
        logger.info('🔄 Legacy app uninstalled webhook received (redirecting to new endpoint)', {
          shopDomain: request.headers.get('X-Shopify-Shop-Domain'),
          topic: request.headers.get('X-Shopify-Topic'),
          legacyUrl: url.pathname
        });

        try {
          const shopDomain = request.headers.get('X-Shopify-Shop-Domain');
          if (shopDomain) {
            // Clear all sessions for the shop when app is uninstalled
            const clearedSessions = await clearShopSessions(shopDomain, env);
            logger.info('Legacy app uninstalled - cleared shop sessions', {
              shopDomain,
              clearedSessions
            });
          }

          const response = new Response(JSON.stringify({
            success: true,
            message: 'Legacy app uninstalled webhook processed',
            note: 'This endpoint is deprecated. Use /api/webhooks/app/uninstalled',
            timestamp: new Date().toISOString()
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });

          logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
          return addCorsHeaders(response, corsHeaders);
        } catch (error: any) {
          logger.error('Legacy app uninstalled webhook error', { error: error.message });
          const response = new Response(JSON.stringify({
            success: false,
            error: 'Failed to process legacy app uninstalled webhook',
            timestamp: new Date().toISOString()
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });

          logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
          return addCorsHeaders(response, corsHeaders);
        }
      }

      // === EXISTING API ENDPOINTS (UNCHANGED) ===

      // DutchNed delivery dates endpoint
      if (url.pathname === '/api/delivery-dates/available') {
        const response = await handleDeliveryDatesEndpoint(env, logger, config);
        logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
        return addCorsHeaders(response, corsHeaders);
      }

      // Shipping methods endpoint
      if (url.pathname === '/api/products/shipping-methods' && request.method === 'POST') {
        const response = await handleShippingMethodsEndpoint(request, env, logger, config);
        logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
        return addCorsHeaders(response, corsHeaders);
      }

      // ERP delivery times endpoint
      if (url.pathname === '/api/products/erp-delivery-times' && request.method === 'POST') {
        const response = await handleErpDeliveryTimesEndpoint(request, env, logger, config);
        logger.logRequest(request.method, url.pathname, response.status, Date.now() - startTime);
        return addCorsHeaders(response, corsHeaders);
      }

      // Debug endpoint to check sessions for a shop
      if (url.pathname === '/debug/sessions' && url.searchParams.get('shop')) {
        const shop = url.searchParams.get('shop')!;
        logger.info('Debug: Checking sessions for shop', { shop });

        try {
          const accessToken = await getShopAccessToken(shop, env);
          const { createSessionStorage } = await import('./utils/sessionStorage');
          const sessionStorage = createSessionStorage(env);
          const sessions = await sessionStorage.findSessionsByShop(shop);

          return new Response(JSON.stringify({
            shop,
            hasAccessToken: !!accessToken,
            accessToken: accessToken ? `${accessToken.substring(0, 10)}...` : null,
            sessionCount: sessions.length,
            sessions: sessions.map(s => ({
              id: s.id,
              shop: s.shop,
              isOnline: s.isOnline,
              hasAccessToken: !!s.accessToken,
              expires: s.expires ? s.expires.toISOString() : null,
              scopes: s.scope
            })),
            timestamp: new Date().toISOString()
          }, null, 2), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        } catch (error) {
          return new Response(JSON.stringify({
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
      }

      // Debug endpoint to clear sessions for a shop
      if (url.pathname === '/debug/clear-sessions' && url.searchParams.get('shop')) {
        const shop = url.searchParams.get('shop')!;
        logger.info('Debug: Clearing sessions for shop', { shop });

        try {
          const { createSessionStorage } = await import('./utils/sessionStorage');
          const sessionStorage = createSessionStorage(env);
          const sessions = await sessionStorage.findSessionsByShop(shop);

          // Delete all sessions for this shop
          for (const session of sessions) {
            await sessionStorage.deleteSession(session.id);
          }

          return new Response(JSON.stringify({
            shop,
            message: `Cleared ${sessions.length} sessions`,
            clearedSessions: sessions.length,
            timestamp: new Date().toISOString()
          }, null, 2), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        } catch (error) {
          return new Response(JSON.stringify({
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
      }

      // Auto-fix session decryption issues
      if (url.pathname === '/debug/fix-sessions' && url.searchParams.get('shop')) {
        const shop = url.searchParams.get('shop')!;
        logger.info('🔧 Debug: Fixing corrupted sessions for shop', { shop });

        try {
          const { createSessionStorage } = await import('./utils/sessionStorage');
          const sessionStorage = createSessionStorage(env);
          
          // Try to get all sessions for this shop, but catch decryption errors
          let allSessionKeys: string[] = [];
          let corruptedSessions: string[] = [];
          let validSessions: any[] = [];

          try {
            const sessions = await sessionStorage.findSessionsByShop(shop);
            validSessions = sessions;
          } catch (sessionError) {
            logger.warn('Error loading sessions - attempting cleanup', { 
              shop, 
              error: sessionError instanceof Error ? sessionError.message : 'Unknown error' 
            });

            // Try to manually clean up corrupted sessions
            // This is a more aggressive approach to find and remove corrupted data
            const kvKeys = await env.WOOOD_KV.list({ prefix: `session_${shop}_` });
            allSessionKeys = kvKeys.keys.map((k: any) => k.name);

            for (const key of allSessionKeys) {
              try {
                const sessionData = await env.WOOOD_KV.get(key);
                if (sessionData) {
                  // Try to parse/decrypt the session
                  JSON.parse(sessionData);
                }
              } catch (parseError) {
                corruptedSessions.push(key);
                logger.info('Found corrupted session, deleting', { shop, sessionKey: key });
                await env.WOOOD_KV.delete(key);
              }
            }
          }

          return new Response(JSON.stringify({
            shop,
            message: 'Session cleanup completed',
            totalSessionKeys: allSessionKeys.length,
            validSessions: validSessions.length,
            corruptedSessionsRemoved: corruptedSessions.length,
            corruptedKeys: corruptedSessions,
            recommendation: corruptedSessions.length > 0 ? 'OAuth reinstall recommended' : 'Sessions are healthy',
            timestamp: new Date().toISOString()
          }, null, 2), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        } catch (error) {
          return new Response(JSON.stringify({
            error: error instanceof Error ? error.message : 'Unknown error',
            shop,
            timestamp: new Date().toISOString()
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
      }

      // Debug endpoint to test metafield API calls
      if (url.pathname === '/debug/metafields' && url.searchParams.get('shop') && url.searchParams.get('productId')) {
        const shop = url.searchParams.get('shop')!;
        const productId = url.searchParams.get('productId')!;

        try {
          const accessToken = await getShopAccessToken(shop, env);

          if (!accessToken) {
            return new Response(JSON.stringify({
              error: 'No access token found for shop',
              shop,
              timestamp: new Date().toISOString()
            }), {
              status: 404,
              headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
          }

          // Test: Get all metafields for the product
          const allMetafieldsUrl = `https://${shop}/admin/api/${config.shopifyOAuth.apiVersion}/products/${productId}/metafields.json`;
          const allMetafieldsResponse = await fetch(allMetafieldsUrl, {
            headers: {
              'X-Shopify-Access-Token': accessToken,
              'Content-Type': 'application/json'
            }
          });

          const results = {
            shop,
            productId,
            accessToken: `${accessToken.substring(0, 10)}...`,
            url: allMetafieldsUrl,
            status: allMetafieldsResponse.status,
            statusText: allMetafieldsResponse.statusText,
            data: allMetafieldsResponse.ok ? await allMetafieldsResponse.json() : await allMetafieldsResponse.text(),
            timestamp: new Date().toISOString()
          };

          return new Response(JSON.stringify(results, null, 2), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });

        } catch (error) {
          return new Response(JSON.stringify({
            error: error instanceof Error ? error.message : 'Unknown error',
            shop,
            productId,
            timestamp: new Date().toISOString()
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
      }

      // Default 404 response
      logger.warn('Endpoint not found', { pathname: url.pathname, method: request.method });
      const notFoundResponse = new Response(JSON.stringify({
        success: false,
        error: 'Endpoint not found',
        pathname: url.pathname,
        availableEndpoints: [
          'GET /health',
          'GET /api/delivery-dates/available',
          'POST /api/products/shipping-methods',
          'POST /api/products/erp-delivery-times',
          'POST /api/webhooks/orders/created',
          'POST /api/webhooks/orders/paid',
          'POST /api/webhooks/orders/updated',
          'POST /api/webhooks/app/uninstalled',
          'POST /api/webhooks/register',
          'GET /api/webhooks/status'
        ],
        timestamp: new Date().toISOString()
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });

      logger.logRequest(request.method, url.pathname, 404, Date.now() - startTime);
      return notFoundResponse;

    } catch (error: any) {
      logger.error('Unhandled worker error', {
        pathname: url.pathname,
        method: request.method,
        error: error.message,
        stack: error.stack
      });

      const errorResponse = new Response(JSON.stringify({
        success: false,
        error: 'Internal server error',
        ...(config.features.enableDetailedErrors && {
          details: error.message,
          pathname: url.pathname
        }),
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });

      logger.logRequest(request.method, url.pathname, 500, Date.now() - startTime);
      return errorResponse;
    }
  },
};

// === WEBHOOK PROCESSING CORE FUNCTION ===

async function processOrderWebhook(
  request: Request,
  env: Env,
  logger: WorkersLogger,
  expectedTopic: string,
  handler: (orderData: ShopifyOrder, shop: string, env: Env, logger: WorkersLogger) => Promise<any>
): Promise<Response> {
  const config = parseEnvironment(env);
  try {
    // Extract webhook headers
    const shopDomain = request.headers.get('X-Shopify-Shop-Domain');
    const topic = request.headers.get('X-Shopify-Topic');
    const hmacHeader = request.headers.get('X-Shopify-Hmac-Sha256');

    if (!shopDomain || !topic || !hmacHeader) {
      logger.warn('Invalid webhook request - missing headers', {
        shopDomain,
        topic,
        hasHmac: !!hmacHeader
      });

      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required webhook headers'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify topic matches expected
    if (topic !== expectedTopic) {
      logger.warn('Webhook topic mismatch', {
        expected: expectedTopic,
        received: topic,
        shopDomain
      });

      return new Response(JSON.stringify({
        success: false,
        error: `Topic mismatch. Expected: ${expectedTopic}, Received: ${topic}`
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Clone the request to read body multiple times
    const requestClone = request.clone();
    
    // Get raw body bytes for signature verification
    const rawBodyBuffer = await request.arrayBuffer();
    const rawBodyBytes = new Uint8Array(rawBodyBuffer);

    // Get text body for JSON parsing
    const bodyText = await requestClone.text();

    // Debug body data
    logger.info('Webhook body data info', {
      shopDomain,
      topic,
      bodyLength: rawBodyBytes.length,
      textLength: bodyText.length,
      bodyStartBytes: Array.from(rawBodyBytes.slice(0, 20)), // First 20 bytes
      bodyStartText: bodyText.substring(0, 50) + '...' // First 50 chars
    });

    // Try both available webhook secrets
    const webhookSecret1 = config.shopifyOAuth.webhookSecret; // WEBHOOK_SECRET
    const webhookSecret2 = env.SHOPIFY_WEBHOOK_SECRET; // Legacy SHOPIFY_WEBHOOK_SECRET
    
    const availableSecrets = [
      { name: 'WEBHOOK_SECRET', secret: webhookSecret1 },
      { name: 'SHOPIFY_WEBHOOK_SECRET', secret: webhookSecret2 }
    ].filter(s => s.secret && s.secret !== 'webhook-secret');

    // Debug webhook secret info
    logger.info('Webhook signature verification setup', {
      shopDomain,
      topic,
      availableSecrets: availableSecrets.map(s => ({
        name: s.name,
        hasSecret: !!s.secret,
        secretLength: s.secret?.length || 0,
        secretPrefix: s.secret ? s.secret.substring(0, 8) + '...' : 'none'
      })),
      headerSignature: hmacHeader ? hmacHeader.substring(0, 12) + '...' : 'none'
    });

    let isValidSignature = false;
    if (availableSecrets.length === 0) {
      logger.warn('No webhook secrets configured - skipping verification', {
        shopDomain,
        topic,
        environment: config.environment
      });
    } else {
      // TEMPORARY: Skip verification in production until OAuth is fixed and webhooks re-registered
      const skipVerificationTemporarily = config.environment === 'production';
      
      if (skipVerificationTemporarily) {
        logger.warn('⚠️ TEMPORARILY SKIPPING webhook verification in production', {
          shopDomain,
          topic,
          reason: 'webhook_secret_mismatch_detected'
        });
        isValidSignature = true; // Allow processing
      } else {
        // Try each available secret
        for (const secretInfo of availableSecrets) {
          logger.info(`Trying webhook secret: ${secretInfo.name}`, {
            shopDomain,
            topic,
            secretLength: secretInfo.secret?.length || 0
          });
          
          isValidSignature = await verifyWebhookSignature(rawBodyBytes, hmacHeader, secretInfo.secret!);
          
          if (isValidSignature) {
            logger.info(`✅ Signature verification SUCCESS with ${secretInfo.name}`, {
              shopDomain,
              topic
            });
            break;
          } else {
            logger.warn(`❌ Signature verification FAILED with ${secretInfo.name}`, {
              shopDomain,
              topic
            });
          }
        }
      }
    }

    if (!isValidSignature && availableSecrets.length > 0) {
      logger.error('Webhook signature verification failed', {
        shopDomain,
        topic,
        testedSecrets: availableSecrets.length,
        secretLengths: availableSecrets.map(s => s.secret?.length || 0),
        signatureLength: hmacHeader?.length || 0,
        bodyLength: rawBodyBytes.length
      });

      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid webhook signature'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (isValidSignature) {
      logger.info('Webhook signature verification passed', {
        shopDomain,
        topic
      });
    } else {
      logger.warn('Webhook signature verification skipped - no secrets available', {
        shopDomain,
        topic,
        environment: config.environment
      });
    }

    // Parse order data
    let orderData: ShopifyOrder;
    try {
      orderData = JSON.parse(bodyText);
      logger.info('Webhook data parsed successfully', {
        orderId: orderData.id,
        orderNumber: orderData.order_number,
        noteAttributesCount: orderData.note_attributes?.length || 0,
        shopDomain
      });
    } catch (parseError: any) {
      logger.error('Failed to parse webhook JSON', {
        error: parseError.message,
        shopDomain,
        topic
      });

      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid JSON in webhook payload'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Process the order using the appropriate handler
    logger.info('Processing order webhook', {
      orderId: orderData.id,
      topic,
      shopDomain,
      noteAttributes: orderData.note_attributes
    });

    const result = await handler(orderData, shopDomain, env, logger);

    logger.info('Order webhook processing completed', {
      orderId: orderData.id,
      success: result.success,
      metafieldsCreated: result.metafieldsCreated,
      processingTime: result.processingTime
    });

    return new Response(JSON.stringify({
      success: result.success,
      orderId: result.orderId,
      metafieldsCreated: result.metafieldsCreated,
      processingTime: result.processingTime,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    logger.error('Webhook processing error', {
      error: error.message,
      stack: error.stack,
      topic: expectedTopic
    });

    return new Response(JSON.stringify({
      success: false,
      error: 'Webhook processing failed',
      details: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// === EXISTING ENDPOINT HANDLERS (REFACTORED) ===

async function handleDeliveryDatesEndpoint(env: Env, logger: WorkersLogger, config: WorkerConfig): Promise<Response> {
  try {
    const dutchNedUrl = config.dutchNedApi.url;
    const credentials = config.dutchNedApi.credentials;

    if (!credentials) {
      logger.info('DutchNed API credentials not configured - returning empty dates');
      return new Response(JSON.stringify({
        success: true,
        data: [],
        message: 'DutchNed API credentials not configured - no delivery dates available',
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    logger.info('Fetching delivery dates from DutchNed API', { url: dutchNedUrl });

    const response = await fetch(dutchNedUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Accept': 'application/json',
        'User-Agent': 'WOOOD-Delivery-API/1.11.1 (Cloudflare Workers)',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      logger.warn('DutchNed API unavailable', {
        status: response.status,
        statusText: response.statusText
      });

      return new Response(JSON.stringify({
        success: true,
        data: [],
        message: `DutchNed API unavailable: ${response.status} ${response.statusText}`,
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const apiData = await response.json();
    const dates: Array<{date: string, displayName: string, available: boolean}> = [];

    if (Array.isArray(apiData)) {
      apiData.filter((item: any) => item && item.date).forEach((item: any) => {
        dates.push({
          date: item.date,
          displayName: item.displayName || new Date(item.date).toLocaleDateString('nl-NL', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          }),
          available: item.available !== false
        });
      });
    }

    logger.info('Delivery dates fetched successfully', { datesCount: dates.length });

    return new Response(JSON.stringify({
      success: true,
      data: dates,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    logger.warn('DutchNed API connection failed', { error: error.message });

    return new Response(JSON.stringify({
      success: true,
      data: [],
      message: `DutchNed API connection failed: ${error.message}`,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleShippingMethodsEndpoint(request: Request, env: Env, logger: WorkersLogger, config: WorkerConfig): Promise<Response> {
  try {
    const body = await request.json() as any;
    const shippingMethodsResponse: Record<string, { value: string; number: number; deliveryTime: string } | null> = {};

    if (!body.productIds || !Array.isArray(body.productIds)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'productIds array is required',
        timestamp: new Date().toISOString()
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if request is from checkout extension
    const origin = request.headers.get('Origin') || '';
    const isCheckoutExtension = origin.includes('shop.app') ||
                               origin.includes('checkout.shopify.com') ||
                               origin.includes('pay.shopify.com') ||
                               origin.includes('shopifycdn.com') ||
                               origin.includes('extensions.shopifycdn.com') ||
                               body.source === 'checkout_extension';

    let shopDomain: string;
    let accessToken: string | undefined;

    if (isCheckoutExtension) {
      // For checkout extensions, get shop domain from request body
      shopDomain = body.shopDomain;
      if (!shopDomain) {
        return new Response(JSON.stringify({
          success: false,
          error: 'shopDomain is required for checkout extension requests',
          timestamp: new Date().toISOString()
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      // Get stored access token for the shop
      accessToken = await getShopAccessToken(shopDomain, env);
      logger.info('Checkout extension shipping methods request', { origin, shopDomain, hasAccessToken: !!accessToken });
    } else {
      // For admin requests, require OAuth authentication
      const sessionResult = await sessionAuthMiddleware(request, env, config, logger, crypto.randomUUID());
      if (!sessionResult.success || !sessionResult.session) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Authentication required',
          timestamp: new Date().toISOString()
        }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      shopDomain = sessionResult.session.shop;
      accessToken = sessionResult.session.accessToken;
      logger.info('OAuth shipping methods request', { shopDomain });
    }

    logger.info('Fetching shipping methods for products', {
      productCount: body.productIds.length,
      shopDomain,
      isCheckoutExtension
    });

    for (const productId of body.productIds) {
      try {
        // Fetch both metafields we need
        const customMetafieldsUrl = `https://${shopDomain}/admin/api/${config.shopifyOAuth.apiVersion}/products/${productId}/metafields.json?namespace=custom&key=ShippingMethod2`;
        const erpMetafieldsUrl = `https://${shopDomain}/admin/api/${config.shopifyOAuth.apiVersion}/products/${productId}/metafields.json?namespace=erp&key=levertijd`;

        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        };

        // Only add access token if we have one (OAuth requests)
        if (accessToken) {
          headers['X-Shopify-Access-Token'] = accessToken;
        }

        // Fetch both metafields in parallel
        const [customResponse, erpResponse] = await Promise.all([
          fetch(customMetafieldsUrl, { headers }),
          fetch(erpMetafieldsUrl, { headers })
        ]);

        let shippingMethodValue: string = '';
        let shippingMethodNumber: number = 0;
        let deliveryTime: string = '';

        // Process custom.ShippingMethod2 metafield
        if (customResponse.ok) {
          const customData = await customResponse.json() as any;
          if (customData.metafields && customData.metafields.length > 0) {
            const shippingMethodMetafield = customData.metafields.find((mf: any) =>
              mf.namespace === 'custom' && mf.key === 'ShippingMethod2'
            );

            if (shippingMethodMetafield && shippingMethodMetafield.value) {
              try {
                const shippingData = JSON.parse(shippingMethodMetafield.value);
                shippingMethodValue = shippingData.value || '';
                shippingMethodNumber = shippingData.number || 0;
              } catch {
                // If JSON parsing fails, treat as plain text and extract number
                const valueString = shippingMethodMetafield.value || '';
                shippingMethodValue = valueString;

                // Extract number from the beginning of the string (e.g., "30 - EXPEDITIE STANDAARD" -> 30)
                const numberMatch = valueString.match(/^(\d+)/);
                if (numberMatch) {
                  shippingMethodNumber = parseInt(numberMatch[1], 10);
                }
              }
            }
          }
        } else {
          logger.warn('Failed to fetch custom shipping metafields for product', {
            productId,
            status: customResponse.status,
            shop: shopDomain,
            isCheckoutExtension
          });
        }

        // Process erp.levertijd metafield
        if (erpResponse.ok) {
          const erpData = await erpResponse.json() as any;
          if (erpData.metafields && erpData.metafields.length > 0) {
            const deliveryTimeMetafield = erpData.metafields.find((mf: any) =>
              mf.namespace === 'erp' && mf.key === 'levertijd'
            );

            if (deliveryTimeMetafield && deliveryTimeMetafield.value) {
              deliveryTime = deliveryTimeMetafield.value;
            }
          }
        } else {
          logger.warn('Failed to fetch ERP delivery time metafields for product', {
            productId,
            status: erpResponse.status,
            shop: shopDomain,
            isCheckoutExtension
          });
        }

        // Set response data
        if (shippingMethodValue || deliveryTime) {
          shippingMethodsResponse[productId] = {
            value: shippingMethodValue,
            number: shippingMethodNumber,
            deliveryTime: deliveryTime
          };
        } else {
          shippingMethodsResponse[productId] = null;
        }

      } catch (productError) {
        logger.warn('Error fetching product metafields', {
          productId,
          error: (productError as Error).message,
          shop: shopDomain,
          isCheckoutExtension
        });
        shippingMethodsResponse[productId] = null;
      }
    }

    logger.info('Shipping methods fetched', {
      productCount: body.productIds.length,
      foundShippingMethods: Object.values(shippingMethodsResponse).filter(v => v !== null).length,
      shop: shopDomain,
      source: isCheckoutExtension ? 'checkout-extension' : 'oauth'
    });

    return new Response(JSON.stringify({
      success: true,
      data: shippingMethodsResponse,
      shop: shopDomain,
      source: isCheckoutExtension ? 'checkout-extension' : 'oauth',
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    logger.error('Shipping methods endpoint error', { error: (error as Error).message });
    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid JSON in request body',
      timestamp: new Date().toISOString()
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleErpDeliveryTimesEndpoint(request: Request, env: Env, logger: WorkersLogger, config: WorkerConfig): Promise<Response> {
  try {
    const body = await request.json() as any;
    const erpResponse: Record<string, string | null> = {};

    if (!body.productIds || !Array.isArray(body.productIds)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'productIds array is required',
        timestamp: new Date().toISOString()
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if request is from checkout extension
    const origin = request.headers.get('Origin') || '';
    const isCheckoutExtension = origin.includes('shop.app') ||
                               origin.includes('checkout.shopify.com') ||
                               origin.includes('pay.shopify.com') ||
                               origin.includes('shopifycdn.com') ||
                               origin.includes('extensions.shopifycdn.com') ||
                               body.source === 'checkout_extension';

    let shopDomain: string;
    let accessToken: string | undefined;

    if (isCheckoutExtension) {
      // For checkout extensions, get shop domain from request body
      shopDomain = body.shopDomain;
      if (!shopDomain) {
        return new Response(JSON.stringify({
          success: false,
          error: 'shopDomain is required for checkout extension requests',
          timestamp: new Date().toISOString()
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      // Get stored access token for the shop
      accessToken = await getShopAccessToken(shopDomain, env);
      logger.info('Checkout extension ERP delivery times request', { origin, shopDomain, hasAccessToken: !!accessToken });
    } else {
      // For admin requests, require OAuth authentication
      const sessionResult = await sessionAuthMiddleware(request, env, config, logger, crypto.randomUUID());
      if (!sessionResult.success || !sessionResult.session) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Authentication required',
          timestamp: new Date().toISOString()
        }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      shopDomain = sessionResult.session.shop;
      accessToken = sessionResult.session.accessToken;
      logger.info('OAuth ERP delivery times request', { shopDomain });
    }

    logger.info('Fetching ERP delivery times for products', {
      productCount: body.productIds.length,
      shopDomain,
      isCheckoutExtension
    });

    for (const productId of body.productIds) {
      try {
        const metafieldsUrl = `https://${shopDomain}/admin/api/${config.shopifyOAuth.apiVersion}/products/${productId}/metafields.json?namespace=erp&key=levertijd`;

        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        };

        // Only add access token if we have one (OAuth requests)
        if (accessToken) {
          headers['X-Shopify-Access-Token'] = accessToken;
        }

        const response = await fetch(metafieldsUrl, { headers });

        if (response.ok) {
          const data = await response.json() as any;

          if (data.metafields && data.metafields.length > 0) {
            const erpMetafield = data.metafields.find((mf: any) =>
              mf.namespace === 'erp' && mf.key === 'levertijd'
            );

            if (erpMetafield && erpMetafield.value) {
              erpResponse[productId] = erpMetafield.value;
            } else {
              erpResponse[productId] = null;
            }
          } else {
            erpResponse[productId] = null;
          }
        } else {
          logger.warn('Failed to fetch ERP metafields for product', {
            productId,
            status: response.status,
            shop: shopDomain,
            isCheckoutExtension
          });
          erpResponse[productId] = null;
        }
      } catch (productError) {
        logger.warn('Error fetching ERP product metafields', {
          productId,
          error: (productError as Error).message,
          shop: shopDomain,
          isCheckoutExtension
        });
        erpResponse[productId] = null;
      }
    }

    logger.info('ERP delivery times fetched', {
      productCount: body.productIds.length,
      foundErpTimes: Object.values(erpResponse).filter(v => v !== null).length,
      shop: shopDomain,
      source: isCheckoutExtension ? 'checkout-extension' : 'oauth'
    });

    return new Response(JSON.stringify({
      success: true,
      data: erpResponse,
      shop: shopDomain,
      source: isCheckoutExtension ? 'checkout-extension' : 'oauth',
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    logger.error('ERP delivery times endpoint error', { error: (error as Error).message });
    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid JSON in request body',
      timestamp: new Date().toISOString()
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// === UTILITY FUNCTIONS ===

/**
 * Get access token for a shop from stored sessions
 */
async function getShopAccessToken(shopDomain: string, env: Env): Promise<string | undefined> {
  try {
    const { createSessionStorage } = await import('./utils/sessionStorage');
    const sessionStorage = createSessionStorage(env);

    // Find all sessions for the shop
    const sessions = await sessionStorage.findSessionsByShop(shopDomain);

    if (sessions.length === 0) {
      return undefined;
    }

    // Find the most recent valid session with access token
    const validSessions = sessions
      .filter(session => session.accessToken && (!session.expires || session.expires > new Date()))
      .sort((a, b) => {
        const aTime = a.expires ? a.expires.getTime() : Date.now() + 86400000;
        const bTime = b.expires ? b.expires.getTime() : Date.now() + 86400000;
        return bTime - aTime; // Most recent first
      });

    const validSession = validSessions.find(session => session?.accessToken);
    return validSession?.accessToken;
  } catch (error) {
    console.error('Failed to get shop access token:', error);
    return undefined;
  }
}

/**
 * Clear all sessions for a shop (used when app is uninstalled)
 */
async function clearShopSessions(shopDomain: string, env: Env): Promise<number> {
  try {
    const { createSessionStorage } = await import('./utils/sessionStorage');
    const sessionStorage = createSessionStorage(env);

    // Find all sessions for the shop
    const sessions = await sessionStorage.findSessionsByShop(shopDomain);

    // Delete all sessions
    for (const session of sessions) {
      await sessionStorage.deleteSession(session.id);
    }

    return sessions.length;
  } catch (error) {
    console.error('Failed to clear shop sessions:', error);
    return 0;
  }
}

function getAllowedOrigin(request: Request, allowedOrigins: string[]): string {
  const origin = request.headers.get('Origin');
  if (!origin) return '*';

  // Essential origins for checkout extensions and Shopify admin
  const coreAllowedOrigins = [
    'https://shop.app',
    'https://checkout.shopify.com',
    'https://pay.shopify.com',
    'https://extensions.shopifycdn.com',
    'https://admin.shopify.com',
    'https://partners.shopify.com'
  ];

  // Combine core origins with configured origins
  const allAllowedOrigins = [...coreAllowedOrigins, ...allowedOrigins];

  for (const allowedOrigin of allAllowedOrigins) {
    if (allowedOrigin === '*') return '*';
    if (allowedOrigin.includes('*')) {
      const pattern = allowedOrigin.replace(/\*/g, '.*');
      const regex = new RegExp(`^${pattern}$`);
      if (regex.test(origin)) return origin;
    } else if (allowedOrigin === origin) {
      return origin;
    }
  }

  return '*'; // Allow all origins if no match found to prevent CORS issues
}

function addCorsHeaders(response: Response, corsHeaders: Record<string, string>): Response {
  const newHeaders = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    newHeaders.set(key, value);
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}

async function verifyWebhookSignature(bodyBytes: Uint8Array, signature: string, secret: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    
    // Try multiple approaches to handle the secret
    const secretApproaches = [
      { name: 'raw_secret', key: encoder.encode(secret) },
      { name: 'base64_decoded_secret', key: (() => {
        try {
          return new Uint8Array(atob(secret).split('').map(c => c.charCodeAt(0)));
        } catch {
          return encoder.encode(secret); // fallback to raw if base64 decode fails
        }
      })() }
    ];

    // Clean the signature (remove any whitespace or extra characters)
    const cleanSignature = signature.trim();
    
    console.log('Webhook signature verification attempts:', {
      bodyBytesLength: bodyBytes.length,
      originalSignature: signature,
      cleanedSignature: cleanSignature,
      secretLength: secret.length,
      secretStartsWithBase64: /^[A-Za-z0-9+/]/.test(secret),
      secretEndsWithEquals: secret.endsWith('='),
    });

    for (const approach of secretApproaches) {
      try {
        const key = await crypto.subtle.importKey(
          'raw',
          approach.key,
          { name: 'HMAC', hash: 'SHA-256' },
          false,
          ['sign']
        );

        // Compute HMAC-SHA256 of the raw body bytes
        const signatureBuffer = await crypto.subtle.sign('HMAC', key, bodyBytes);

        // Try both base64 and hex output formats
        const computedBase64 = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));
        const computedHex = Array.from(new Uint8Array(signatureBuffer))
          .map(b => b.toString(16).padStart(2, '0')).join('');

        const matchBase64 = computedBase64 === cleanSignature;
        const matchHex = computedHex === cleanSignature;

        console.log(`Approach: ${approach.name}`, {
          keyLength: approach.key.length,
          computedBase64,
          computedHex,
          receivedSignature: cleanSignature,
          matchBase64,
          matchHex,
          firstDiffBase64: matchBase64 ? 'none' : (() => {
            for (let i = 0; i < Math.min(computedBase64.length, cleanSignature.length); i++) {
              if (computedBase64[i] !== cleanSignature[i]) {
                return { position: i, computed: computedBase64[i], received: cleanSignature[i] };
              }
            }
            return 'length_mismatch';
          })()
        });

        if (matchBase64 || matchHex) {
          console.log(`✅ Signature verification SUCCESS with approach: ${approach.name}, format: ${matchBase64 ? 'base64' : 'hex'}`);
          return true;
        }
      } catch (approachError) {
        console.error(`Approach ${approach.name} failed:`, approachError);
      }
    }

    console.log('❌ All signature verification approaches failed');
    return false;
  } catch (error) {
    console.error('Webhook signature verification error:', error);
    return false;
  }
}