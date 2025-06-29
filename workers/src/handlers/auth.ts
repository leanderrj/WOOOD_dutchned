/**
 * Modern Shopify OAuth handlers for Cloudflare Workers
 * Implements proper OAuth flow with session management and security
 */

import { Env, WorkerConfig } from '../types/env';
import { WorkersLogger } from '../utils/logger';
import { createOAuthService, OAuthUtils } from '../services/shopifyOAuthService';
import { Session } from '../types/session';

/**
 * Handle OAuth installation initiation
 * Task 10.4: OAuth Installation Handler
 */
export async function handleOAuthStart(
  request: Request,
  env: Env,
  config: WorkerConfig,
  logger: WorkersLogger,
  requestId: string
): Promise<Response> {
  try {
    const url = new URL(request.url);
    const shop = url.searchParams.get('shop');
    const isOnline = url.searchParams.get('online') === 'true';

    logger.info('OAuth installation request', {
      requestId,
      shop: shop ?? undefined,
      isOnline,
      userAgent: request.headers.get('User-Agent') ?? undefined
    });

    if (!shop) {
      return new Response(
        JSON.stringify({
          error: 'Missing shop parameter',
          message: 'Shop domain is required to start OAuth flow'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate shop domain format
    const validatedShop = OAuthUtils.extractShopDomain(shop || '');
    if (!validatedShop) {
      return new Response(
        JSON.stringify({
          error: 'Invalid shop domain',
          message: 'Shop domain must be a valid Shopify domain'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Create OAuth service and begin flow
    const oauthService = createOAuthService(env, config);
    const authUrl = await oauthService.beginOAuth(validatedShop, isOnline);

    logger.info('OAuth URL generated', {
      requestId,
      shop: validatedShop,
      authUrl: authUrl.substring(0, 100) + '...' // Log partial URL for security
    });

    // Redirect to Shopify OAuth
    return Response.redirect(authUrl, 302);

  } catch (error) {
    logger.error('OAuth initiation failed', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return new Response(
      JSON.stringify({
        error: 'OAuth initiation failed',
        message: 'Unable to start OAuth flow. Please try again.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

/**
 * Handle OAuth callback and complete installation
 * Task 10.5: OAuth Callback Handler
 */
export async function handleOAuthCallback(
  request: Request,
  env: Env,
  config: WorkerConfig,
  logger: WorkersLogger,
  requestId: string
): Promise<Response> {
  try {
    const url = new URL(request.url);
    const shop = url.searchParams.get('shop');
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    logger.info('OAuth callback received', {
      requestId,
      shop: shop ?? undefined,
      hasCode: !!code,
      hasState: !!state,
      error: error ?? undefined
    });

    // Handle OAuth denial
    if (error) {
      logger.warn('OAuth denied by user', { requestId, shop: shop ?? undefined, error: error ?? undefined });
      return createOAuthErrorResponse(
        'OAuth Access Denied',
        'The installation was cancelled. You can try installing again from your Shopify admin.',
        shop || undefined
      );
    }

    // Validate required parameters
    if (!shop || !code || !state) {
      logger.error('OAuth callback missing parameters', {
        requestId,
        hasShop: !!shop,
        hasCode: !!code,
        hasState: !!state
      });

      return createOAuthErrorResponse(
        'Invalid OAuth Callback',
        'Missing required parameters. Please try installing the app again.',
        shop || undefined
      );
    }

    // Complete OAuth flow
    const oauthService = createOAuthService(env, config);
    const callbackResult = await oauthService.completeOAuth(request);

    logger.info('OAuth completed successfully', {
      requestId,
      shop: callbackResult.session.shop,
      sessionId: callbackResult.session.id,
      isNewInstallation: callbackResult.isNewInstallation,
      hasAccessToken: !!callbackResult.session.accessToken
    });

    // Register mandatory webhooks for new installations
    if (callbackResult.isNewInstallation) {
      await registerMandatoryWebhooks(callbackResult.session, config, logger, requestId);
    }

    // Create success response
    return createOAuthSuccessResponse(callbackResult.session, callbackResult.isNewInstallation, env);

  } catch (error) {
    logger.error('OAuth callback failed', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return createOAuthErrorResponse(
      'Installation Failed',
      'Unable to complete app installation. Please try again.',
      new URL(request.url).searchParams.get('shop')
    );
  }
}

/**
 * Handle app installation page (legacy)
 */
export async function handleAppInstallation(
  request: Request,
  env: Env,
  config: WorkerConfig,
  logger: WorkersLogger,
  requestId: string
): Promise<Response> {
  const url = new URL(request.url);
  const shop = url.searchParams.get('shop');

  logger.info('Legacy app installation request', {
    requestId,
    shop: shop ?? undefined,
    note: 'Redirecting to modern OAuth flow'
  });

  // Redirect to modern OAuth flow
  const oauthUrl = new URL(request.url);
  oauthUrl.pathname = '/auth/start';

  return Response.redirect(oauthUrl.toString(), 302);
}

/**
 * Register mandatory webhooks after successful installation
 */
async function registerMandatoryWebhooks(
  session: Session,
  config: WorkerConfig,
  logger: WorkersLogger,
  requestId: string
): Promise<void> {
  try {
    const webhooks = [
      {
        topic: 'orders/paid',
        address: `${config.shopifyOAuth.appUrl}/webhooks/orders/paid`,
        format: 'json',
      },
      {
        topic: 'app/uninstalled',
        address: `${config.shopifyOAuth.appUrl}/webhooks/app/uninstalled`,
        format: 'json',
      },
    ];

    logger.info('Registering mandatory webhooks', {
      requestId,
      shop: session.shop,
      webhookCount: webhooks.length
    });

    for (const webhook of webhooks) {
      try {
        // Create GraphQL mutation for webhook registration
        const mutation = `
          mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {
            webhookSubscriptionCreate(topic: $topic, webhookSubscription: $webhookSubscription) {
              webhookSubscription {
                id
                callbackUrl
              }
              userErrors {
                field
                message
              }
            }
          }
        `;

        const variables = {
          topic: webhook.topic.toUpperCase().replace('/', '_'),
          webhookSubscription: {
            callbackUrl: webhook.address,
            format: webhook.format.toUpperCase(),
          },
        };

        // Make authenticated GraphQL request
        const response = await fetch(`https://${session.shop}/admin/api/${config.shopifyOAuth.apiVersion}/graphql.json`, {
          method: 'POST',
          headers: {
            'X-Shopify-Access-Token': session.accessToken || '',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: mutation,
            variables,
          }),
        });

        if (response.ok) {
          const data = await response.json() as any;
          if (data.data?.webhookSubscriptionCreate?.webhookSubscription) {
            logger.info('Webhook registered successfully', {
              requestId,
              shop: session.shop,
              topic: webhook.topic,
              webhookId: data.data.webhookSubscriptionCreate.webhookSubscription.id
            });
          } else {
            logger.warn('Webhook registration failed', {
              requestId,
              shop: session.shop,
              topic: webhook.topic,
              errors: data.data?.webhookSubscriptionCreate?.userErrors
            });
          }
        } else {
          logger.error('Webhook registration request failed', {
            requestId,
            shop: session.shop,
            topic: webhook.topic,
            status: response.status,
            statusText: response.statusText
          });
        }
      } catch (webhookError) {
        logger.error('Individual webhook registration failed', {
          requestId,
          shop: session.shop,
          topic: webhook.topic,
          error: webhookError instanceof Error ? webhookError.message : 'Unknown error'
        });
      }
    }

  } catch (error) {
    logger.error('Webhook registration failed', {
      requestId,
      shop: session.shop,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Create OAuth success response with proper App Bridge integration
 */
function createOAuthSuccessResponse(session: Session, isNewInstallation: boolean, env: Env): Response {
  const successHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WOOOD Delivery - Installation ${isNewInstallation ? 'Complete' : 'Updated'}</title>
  <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .container { 
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      text-align: center;
      max-width: 600px;
      width: 100%;
    }
    .success { 
      background: #e7f5e7; 
      border: 1px solid #4caf50; 
      border-radius: 4px; 
      padding: 15px; 
      margin-bottom: 20px;
    }
    .installation-badge {
      display: inline-block;
      background: ${isNewInstallation ? '#48bb78' : '#ed8936'};
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .redirect-info {
      background: #f7fafc;
      padding: 20px;
      border-radius: 8px;
      margin: 24px 0;
      border-left: 4px solid #4299e1;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="success">
      <h2>✅ Installation ${isNewInstallation ? 'Complete' : 'Updated'}</h2>
      <div class="installation-badge">${isNewInstallation ? 'NEW INSTALLATION' : 'UPDATE COMPLETE'}</div>
      <p>WOOOD Delivery Date Picker has been successfully ${isNewInstallation ? 'installed' : 'updated'} for ${session.shop}.</p>
      <div class="redirect-info">
        <p><strong>Redirecting to app dashboard...</strong></p>
        <p>You can access the app anytime from your Shopify Admin → Apps section.</p>
      </div>
    </div>
  </div>
  <script>
    // Initialize App Bridge and redirect to main app
    const urlParams = new URLSearchParams(window.location.search);
    const host = urlParams.get('host');
    const shop = '${session.shop}';
    
    if (window.shopify && window.shopify.AppBridge) {
      const app = window.shopify.AppBridge.createApp({
                 apiKey: '${env.WOOOD_OAUTH_CLIENT_ID}',
        host: host,
        forceRedirect: true
      });

      // Redirect to main app interface after 3 seconds
      setTimeout(() => {
        if (window.parent !== window) {
          // We're in an iframe, redirect the parent
          window.parent.location.href = '/admin/apps/' + shop;
        } else {
          // Standalone mode, redirect current window
          window.location.href = '/admin?shop=' + encodeURIComponent(shop);
        }
      }, 3000);
    } else {
      // Fallback if App Bridge is not available
      setTimeout(() => {
        window.location.href = '/admin?shop=' + encodeURIComponent(shop);
      }, 3000);
    }
  </script>
</body>
</html>`;

  return new Response(successHtml, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Frame-Options': 'ALLOWALL', // Allow embedding in Shopify admin
      'Content-Security-Policy': "frame-ancestors 'self' https://*.myshopify.com https://admin.shopify.com",
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });
}

/**
 * Create OAuth error response
 */
function createOAuthErrorResponse(title: string, message: string, shop?: string | null | undefined): Response {
  const errorHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>WOOOD Delivery - ${title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 500px;
            width: 100%;
        }
        .error-icon {
            color: #e53e3e;
            font-size: 48px;
            margin-bottom: 20px;
        }
        h1 {
            color: #2d3748;
            margin-bottom: 16px;
        }
        p {
            color: #4a5568;
            line-height: 1.6;
            margin-bottom: 24px;
        }
        .retry-btn {
            background: #4299e1;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin: 10px;
        }
        .close-btn {
            background: #718096;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            margin: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="error-icon">❌</div>
        <h1>${title}</h1>
        <p>${message}</p>
        ${shop ? `<p><strong>Shop:</strong> ${shop}</p>` : ''}

        ${shop ? `
        <a href="/auth/start?shop=${encodeURIComponent(shop)}" class="retry-btn">
            🔄 Try Again
        </a>
        ` : ''}

        <button class="close-btn" onclick="window.close()">
            Close Window
        </button>
    </div>
</body>
</html>`;

  return new Response(errorHtml, {
    status: 400,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });
}