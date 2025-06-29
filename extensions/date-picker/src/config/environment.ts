/**
 * Centralized environment configuration for the date-picker extension
 * All environment variables are managed through the env-sync process
 */

export const config = {
  // API Configuration - uses environment variable set by env-sync
  // Temporarily using production URL while troubleshooting local HTTPS Workers setup
  apiBaseUrl: (import.meta as any).env?.VITE_API_BASE_URL || 'https://woood-production.leander-4e0.workers.dev',

  // Feature flags
  enableMockMode: (import.meta as any).env?.VITE_ENABLE_MOCK_MODE === 'true',
  debugMode: (import.meta as any).env?.VITE_DEBUG_MODE === 'true',

  // Shopify Configuration
  shopDomain: (import.meta as any).env?.VITE_SHOPIFY_SHOP_DOMAIN || '',

  // Environment info (for logging/debugging)
  environment: (import.meta as any).env?.MODE || 'development',
  isDevelopment: (import.meta as any).env?.DEV === true,
  isProduction: (import.meta as any).env?.PROD === true,
} as const;

/**
 * Log configuration on import (only in development)
 */
if (config.debugMode) {
  console.log('🔧 Extension Configuration:', {
    apiBaseUrl: config.apiBaseUrl,
    enableMockMode: config.enableMockMode,
    environment: config.environment,
    isDevelopment: config.isDevelopment,
    isProduction: config.isProduction
  });
}