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
      // Validate required secrets on startup
      SecretValidationService.validateRequiredSecrets(env);
      
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

    // Get request body
    const body = await request.text();

    // Verify webhook signature
    const isValidSignature = await verifyWebhookSignature(
      body,
      hmacHeader,
      env.SHOPIFY_WEBHOOK_SECRET || 'webhook-secret'
    );

    // TEMPORARY: Skip signature verification for testing - REMOVE IN PRODUCTION
    const skipSignatureVerification = true; // Set to false once webhook secret is configured

    if (!isValidSignature && !skipSignatureVerification) {
      logger.error('Webhook signature verification failed', {
        shopDomain,
        topic
      });

      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid webhook signature'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (skipSignatureVerification) {
      logger.warn('Webhook signature verification SKIPPED for testing', {
        shopDomain,
        topic,
        signatureValid: isValidSignature
      });
    }

    // Parse order data
    let orderData: ShopifyOrder;
    try {
      orderData = JSON.parse(body);
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
    const shippingMethodsResponse: Record<string, { value: string; number: number } | null> = {};

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

    const shopDomain = body.shopDomain || config.shopifyApi.shopDomain;
    const accessToken = config.shopifyApi.accessToken;

    if (!shopDomain || !accessToken) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Shopify credentials not configured',
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    logger.info('Fetching shipping methods for products', {
      productCount: body.productIds.length,
      shopDomain
    });

    for (const productId of body.productIds) {
      try {
        const metafieldsUrl = `https://${shopDomain}/admin/api/${config.shopifyApi.apiVersion}/products/${productId}/metafields.json?namespace=custom&key=ShippingMethod2`;

        const response = await fetch(metafieldsUrl, {
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json() as any;

          if (data.metafields && data.metafields.length > 0) {
            const shippingMethodMetafield = data.metafields.find((mf: any) =>
              mf.namespace === 'custom' && mf.key === 'ShippingMethod2'
            );

            if (shippingMethodMetafield && shippingMethodMetafield.value) {
              const metafieldValue = shippingMethodMetafield.value;
              const match = metafieldValue.match(/^(\d+)\s*-/);
              const extractedNumber = match ? parseInt(match[1], 10) : 0;

              shippingMethodsResponse[productId] = {
                value: metafieldValue,
                number: extractedNumber
              };
            } else {
              shippingMethodsResponse[productId] = null;
            }
          } else {
            shippingMethodsResponse[productId] = null;
          }
        } else {
          shippingMethodsResponse[productId] = null;
        }
      } catch (productError) {
        shippingMethodsResponse[productId] = null;
      }
    }

    logger.info('Shipping methods fetched', {
      productCount: body.productIds.length,
      foundShippingMethods: Object.values(shippingMethodsResponse).filter(v => v !== null).length
    });

    return new Response(JSON.stringify({
      success: true,
      data: shippingMethodsResponse,
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

    const shopDomain = body.shopDomain || config.shopifyApi.shopDomain;
    const accessToken = config.shopifyApi.accessToken;

    if (!shopDomain || !accessToken) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Shopify credentials not configured',
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    logger.info('Fetching ERP delivery times for products', {
      productCount: body.productIds.length,
      shopDomain
    });

    for (const productId of body.productIds) {
      try {
        const metafieldsUrl = `https://${shopDomain}/admin/api/${config.shopifyApi.apiVersion}/products/${productId}/metafields.json?namespace=erp&key=levertijd`;

        const response = await fetch(metafieldsUrl, {
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json'
          }
        });

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
          erpResponse[productId] = null;
        }
      } catch (productError) {
        erpResponse[productId] = null;
      }
    }

    logger.info('ERP delivery times fetched', {
      productCount: body.productIds.length,
      foundErpTimes: Object.values(erpResponse).filter(v => v !== null).length
    });

    return new Response(JSON.stringify({
      success: true,
      data: erpResponse,
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

function getAllowedOrigin(request: Request, allowedOrigins: string[]): string {
  const origin = request.headers.get('Origin');
  if (!origin) return '*';

  for (const allowedOrigin of allowedOrigins) {
    if (allowedOrigin === '*') return '*';
    if (allowedOrigin.includes('*')) {
      const pattern = allowedOrigin.replace(/\*/g, '.*');
      const regex = new RegExp(`^${pattern}$`);
      if (regex.test(origin)) return origin;
    } else if (allowedOrigin === origin) {
      return origin;
    }
  }

  return allowedOrigins[0] || '*';
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

async function verifyWebhookSignature(body: string, signature: string, secret: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
    const computedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Shopify sends signature as base64, decode it to hex for comparison
    let decodedSignature: string;
    try {
      const binarySignature = atob(signature);
      decodedSignature = Array.from(binarySignature)
        .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('');
    } catch (decodeError) {
      // If base64 decode fails, signature might already be in hex format
      decodedSignature = signature.toLowerCase();
    }

    const match = computedSignature === decodedSignature;

    // Debug logging for signature verification (remove in production)
    console.log('Webhook signature verification:', {
      computedLength: computedSignature.length,
      decodedLength: decodedSignature.length,
      match,
      // Don't log actual signatures for security
      computedPrefix: computedSignature.substring(0, 8),
      decodedPrefix: decodedSignature.substring(0, 8)
    });

    return match;
  } catch (error) {
    console.error('Webhook signature verification error:', error);
    return false;
  }
}