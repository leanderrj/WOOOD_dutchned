/**
 * Environment interface for Cloudflare Workers
 * Defines all environment variables and bindings available to the worker
 */
export interface Env {
  // Environment identification
  ENVIRONMENT: string;

  // DutchNed API configuration
  DUTCHNED_API_URL: string;
  DUTCHNED_API_CREDENTIALS: string;

  // Feature flags
  USE_MOCK_DELIVERY_DATES: string;
  ENABLE_CACHING: string;
  ENABLE_RATE_LIMITING: string;
  ENABLE_MOCK_FALLBACK: string;
  ENABLE_DETAILED_ERROR_MESSAGES: string;
  ENABLE_PERFORMANCE_MONITORING: string;
  ENABLE_REQUEST_LOGGING: string;
  ENABLE_ERROR_TRACKING: string;
  ENABLE_LOADING_STATES: string;
  ENABLE_USER_FEEDBACK: string;
  ENABLE_EXTERNAL_ERROR_REPORTING: string;
  ENABLE_ANALYTICS_TRACKING: string;
  ENABLE_WEBHOOK_NOTIFICATIONS: string;
  ENABLE_DEBUG_LOGGING: string;
  ENABLE_VERBOSE_RESPONSES: string;
  ENABLE_DUTCHNED_API: string;
  ENABLE_SHIPPING_METHOD_PROCESSING: string;

  // CORS configuration
  CORS_ORIGINS: string;

  // Cache configuration
  CACHE_DURATION: string;
  API_TIMEOUT: string;
  MAX_RETRIES: string;

  // Rate limiting configuration
  RATE_LIMIT_WINDOW_MS: string;
  RATE_LIMIT_MAX_REQUESTS: string;

  // External service endpoints (optional)
  LOGGING_ENDPOINT?: string;
  ERROR_TRACKING_ENDPOINT?: string;
  ANALYTICS_ENDPOINT?: string;
  WEBHOOK_ENDPOINT?: string;

  // Cloudflare bindings (will be properly typed after dependency installation)
  DELIVERY_CACHE: any; // KVNamespace after @cloudflare/workers-types is installed
  RATE_LIMITER: any; // DurableObjectNamespace after @cloudflare/workers-types is installed
}

/**
 * Configuration object derived from environment variables
 */
export interface WorkerConfig {
  environment: string;
  dutchNedApi: {
    url: string;
    credentials: string;
    timeout: number;
    maxRetries: number;
  };
  cache: {
    duration: number;
    enabled: boolean;
  };
  cors: {
    origins: string[];
  };
  rateLimit: {
    enabled: boolean;
    windowMs: number;
    maxRequests: number;
  };
  features: {
    useMockData: boolean;
    enableCaching: boolean;
    enableRateLimiting: boolean;
    enableMockFallback: boolean;
    enableDetailedErrors: boolean;
    enablePerformanceMonitoring: boolean;
    enableRequestLogging: boolean;
    enableErrorTracking: boolean;
    enableLoadingStates: boolean;
    enableUserFeedback: boolean;
    enableExternalErrorReporting: boolean;
    enableAnalyticsTracking: boolean;
    enableWebhookNotifications: boolean;
    enableDebugLogging: boolean;
    enableVerboseResponses: boolean;
    enableDutchNedApi: boolean;
    enableShippingMethodProcessing: boolean;
  };
  endpoints: {
    logging?: string | undefined;
    errorTracking?: string | undefined;
    analytics?: string | undefined;
    webhook?: string | undefined;
  };
}

/**
 * Parse environment variables into a structured configuration object
 */
export function parseEnvironment(env: Env): WorkerConfig {
  return {
    environment: env.ENVIRONMENT || 'development',
    dutchNedApi: {
      url: env.DUTCHNED_API_URL || 'https://eekhoorn-connector.dutchned.com/api/delivery-dates/available',
      credentials: env.DUTCHNED_API_CREDENTIALS || '',
      timeout: parseInt(env.API_TIMEOUT || '10000', 10),
      maxRetries: parseInt(env.MAX_RETRIES || '3', 10),
    },
    cache: {
      duration: parseInt(env.CACHE_DURATION || '300000', 10), // 5 minutes
      enabled: env.ENABLE_CACHING === 'true',
    },
    cors: {
      origins: (env.CORS_ORIGINS || 'https://shop.app,https://checkout.shopify.com,https://*.myshopify.com')
        .split(',')
        .map(origin => origin.trim()),
    },
    rateLimit: {
      enabled: env.ENABLE_RATE_LIMITING === 'true',
      windowMs: parseInt(env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
      maxRequests: parseInt(env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    },
    features: {
      useMockData: env.USE_MOCK_DELIVERY_DATES === 'true',
      enableCaching: env.ENABLE_CACHING === 'true',
      enableRateLimiting: env.ENABLE_RATE_LIMITING === 'true',
      enableMockFallback: env.ENABLE_MOCK_FALLBACK === 'true',
      enableDetailedErrors: env.ENABLE_DETAILED_ERROR_MESSAGES === 'true',
      enablePerformanceMonitoring: env.ENABLE_PERFORMANCE_MONITORING === 'true',
      enableRequestLogging: env.ENABLE_REQUEST_LOGGING === 'true',
      enableErrorTracking: env.ENABLE_ERROR_TRACKING === 'true',
      enableLoadingStates: env.ENABLE_LOADING_STATES === 'true',
      enableUserFeedback: env.ENABLE_USER_FEEDBACK === 'true',
      enableExternalErrorReporting: env.ENABLE_EXTERNAL_ERROR_REPORTING === 'true',
      enableAnalyticsTracking: env.ENABLE_ANALYTICS_TRACKING === 'true',
      enableWebhookNotifications: env.ENABLE_WEBHOOK_NOTIFICATIONS === 'true',
      enableDebugLogging: env.ENABLE_DEBUG_LOGGING === 'true',
      enableVerboseResponses: env.ENABLE_VERBOSE_RESPONSES === 'true',
      enableDutchNedApi: env.ENABLE_DUTCHNED_API !== 'false', // Default to true
      enableShippingMethodProcessing: env.ENABLE_SHIPPING_METHOD_PROCESSING === 'true',
    },
    endpoints: {
      logging: env.LOGGING_ENDPOINT,
      errorTracking: env.ERROR_TRACKING_ENDPOINT,
      analytics: env.ANALYTICS_ENDPOINT,
      webhook: env.WEBHOOK_ENDPOINT,
    },
  };
} 