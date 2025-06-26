# Comprehensive Technical Plan: Shopify Checkout Extension with Delivery Date Picker

## Project Overview
Build a standalone Shopify Checkout UI Extension with delivery date picker that queries the DutchNed API, with minimal backend hosting requirements.

---

## Sprint 1: Backend API Proxy Setup (8 Story Points) ✅ COMPLETED

### Task 1.1: Environment Configuration (1 SP) ✅
- ✅ Create `.env.example` and `.env` files
- ✅ Define environment variables:
  ```
  DUTCHNED_API_URL=https://eekhoorn-connector.dutchned.com/api/delivery-dates/available
  DUTCHNED_API_CREDENTIALS=YmFzaWM6YmwyMzFBU1hDMDk1M0pL
  USE_MOCK_DELIVERY_DATES=false
  CACHE_DURATION=300000
  API_TIMEOUT=10000
  MAX_RETRIES=3
  CORS_ORIGINS=https://shop.app,https://checkout.shopify.com
  ```

### Task 1.2: Package.json and Dependencies (1 SP) ✅
- ✅ Create `package.json` for backend
- ✅ Add dependencies:
  ```json
  {
    "dependencies": {
      "express": "^4.18.2",
      "cors": "^2.8.5",
      "helmet": "^7.0.0",
      "dotenv": "^16.3.1"
    },
    "devDependencies": {
      "@types/node": "^20.0.0",
      "@types/express": "^4.17.17",
      "@types/cors": "^2.8.13",
      "typescript": "^5.0.0",
      "ts-node": "^10.9.1"
    }
  }
  ```

### Task 1.3: Core API Service Implementation (2 SP) ✅
- ✅ Create `src/services/deliveryDatesService.ts`
- ✅ Implement interfaces:
  ```typescript
  interface DeliveryDate {
    date: string;
    displayName: string;
  }

  interface CacheEntry {
    data: DeliveryDate[];
    timestamp: number;
  }
  ```
- ✅ Implement in-memory cache with 5-minute TTL
- ✅ Add retry logic with exponential backoff (1s, 2s, 4s)

### Task 1.4: External API Integration (2 SP) ✅
- ✅ Create `src/api/dutchNedClient.ts`
- ✅ Implement `fetchDeliveryDatesFromAPI()` with:
  - ✅ AbortController for 10-second timeout
  - ✅ Basic authentication header
  - ✅ Error handling for non-200 responses
  - ✅ JSON parsing and validation

### Task 1.5: Mock Data Generator (1 SP) ✅
- ✅ Create `src/utils/mockDataGenerator.ts`
- ✅ Generate 14 weekdays starting tomorrow
- ✅ Format dates in Dutch locale (nl-NL)
- ✅ Skip weekends (Saturday/Sunday)

### Task 1.6: Express Server Setup (1 SP) ✅
- ✅ Create `src/server.ts`
- ✅ Configure middleware: CORS, Helmet, JSON parsing
- ✅ Add health check endpoint `/health`
- ✅ Add main endpoint `/api/delivery-dates/available`
- ✅ Error handling middleware

---

## Sprint 2: Frontend Extension Refactor (8 Story Points) ✅ COMPLETED

### Task 2.1: Package.json Updates (1 SP) ✅
- ✅ Update `extensions/date-picker/package.json`
- ✅ Remove Gadget dependencies:
  ```json
  {
    "dependencies": {
      "@shopify/ui-extensions-react": "^2024.1.0",
      "react": "^18.2.0"
    },
    "devDependencies": {
      "@types/react": "^18.2.0",
      "typescript": "^5.0.0"
    }
  }
  ```

### Task 2.2: Environment Configuration (1 SP) ✅
- ✅ Create `extensions/date-picker/.env.example`
- ✅ Define variables:
  ```
  VITE_API_BASE_URL=https://your-backend.vercel.app
  VITE_ENABLE_MOCK_MODE=false
  ```
- ✅ Update build process to use environment variables

### Task 2.3: API Client Implementation (2 SP) ✅
- ✅ Create `src/services/apiClient.ts`
- ✅ Implement `fetchDeliveryDates()` function
- ✅ Add error handling and timeout (15 seconds)
- ✅ Add TypeScript interfaces for API responses

### Task 2.4: Component Refactoring (2 SP) ✅
- ✅ Update `src/index.tsx`
- ✅ Remove Gadget imports and Provider wrapper
- ✅ Replace `useGlobalAction` with custom `useFetch` hook
- ✅ Maintain existing UI/UX:
  - ✅ Loading skeletons
  - ✅ Error banners
  - ✅ Date selection buttons
  - ✅ Netherlands-only filtering
  - ✅ Cart attribute saving via `useApplyAttributeChange`

### Task 2.5: Shipping Method Integration (2 SP) ✅
- ✅ Add shipping method selection functionality to date picker extension
- ✅ Detect selected shipping method from Shopify Functions delivery customization
- ✅ Save selected shipping method as order metafield
- ✅ Integrate with existing delivery date selection workflow

---

## Sprint 3: Shipping Method Function Migration (4 Story Points) ✅ COMPLETED

### Task 3.1: Shipping Method Function Refactor (2 SP) ✅
- ✅ Migrate existing shipping-method Shopify Function to standalone structure
- ✅ Remove any Gadget dependencies from function logic
- ✅ Maintain product metafield-based shipping method filtering
- ✅ Ensure proper delivery option renaming and hiding logic

### Task 3.2: Shipping Method Backend Integration (2 SP) ✅
- ✅ Add backend endpoint `/api/shipping-methods/process`
- ✅ Process shipping method selection and save to order metafields
- ✅ Integrate with existing delivery dates service
- ✅ Add feature flag for shipping option changes
- ✅ Add logging and error handling for shipping method operations

---

## Sprint 4: Deployment and Configuration (5 Story Points) ✅ COMPLETED

### Task 4.1: Backend Deployment Setup (2 SP) ✅
- ✅ Create `vercel.json` configuration with Node.js build and routing
- ✅ Configure environment variables for production deployment
- ✅ Set up CORS for Shopify domains with wildcard pattern support
- ✅ Add production-ready server configuration with 30-second timeout

### Task 4.2: Extension Configuration (1 SP) ✅
- ✅ Update `shopify.extension.toml` for both extensions with proper descriptions
- ✅ Configure extension metadata and permissions
- ✅ Add extension settings for API URL configuration
- ✅ Set up environment variable support for extensions

### Task 4.3: Build Scripts and CI/CD (1 SP) ✅
- ✅ Add comprehensive build scripts to all package.json files
- ✅ Create deployment documentation (DEPLOYMENT.md)
- ✅ Set up root-level build orchestration scripts
- ✅ Add type checking and clean scripts for all components

### Task 4.4: Testing and Validation (1 SP) ✅
- ✅ Test backend TypeScript compilation and build process
- ✅ Validate extension TypeScript compilation
- ✅ Fix TypeScript errors in date-picker extension
- ✅ Verify shipping method function compilation
- ✅ Test build script execution for all components

---

## Sprint 5: Error Handling and Monitoring (4 Story Points) ✅ COMPLETED

### Task 5.1: Comprehensive Error Handling (2 SP) ✅
- ✅ Add structured logging to backend with LogLevel enum and metadata support
- ✅ Implement error boundaries in frontend with React class component and hooks
- ✅ Add user-friendly error messages in both English and Dutch locales
- ✅ Configure error tracking endpoint `/api/errors/track` for frontend extensions
- ✅ Add performance monitoring with PerformanceMonitor class and async operation tracking
- ✅ Implement ErrorTracker singleton with external service integration support

### Task 5.2: Feature Flags Implementation (1 SP) ✅
- ✅ Add comprehensive feature flag support with FeatureFlagsManager singleton
- ✅ Implement 15+ feature flags covering core functionality, performance, UI/UX, and external services
- ✅ Add environment variable parsing and validation for all feature flags
- ✅ Include backwards compatibility with existing shipping method service
- ✅ Support runtime feature flag checking with fallback mechanisms
- ✅ Add feature flag categorization (core, performance, ui, external, debug)

### Task 5.3: Performance Optimization (1 SP) ✅
- ✅ Add request caching headers with Cache-Control, ETag, and Last-Modified
- ✅ Implement performance monitoring headers (X-Response-Time, X-Request-ID)
- ✅ Add comprehensive rate limiting middleware with configurable windows and limits
- ✅ Implement client tracking and cleanup for rate limiting
- ✅ Add performance measurement integration with feature flag controls
- ✅ Include rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset)

---

## Sprint 6: Documentation and Cleanup (3 Story Points) ✅ COMPLETED

### Task 6.1: Technical Documentation (1 SP) ✅
- ✅ Create comprehensive README.md with API documentation, deployment guide, and troubleshooting
- ✅ Document API endpoints and responses with examples
- ✅ Add troubleshooting guide with common issues and solutions
- ✅ Document deployment process for Vercel and Shopify extensions
- ✅ Document shipping method function integration and business logic
- ✅ Create comprehensive DEPLOYMENT.md with step-by-step deployment instructions

### Task 6.2: Code Cleanup (1 SP) ✅
- ✅ Remove all Gadget-related files and dependencies from root package.json
- ✅ Clean up unused imports and code throughout the project
- ✅ Add TypeScript strict mode to all components (already enabled)
- ✅ Update project configuration files (tsconfig.json, .gitignore, shopify.app.toml)
- ✅ Remove Gadget-specific files (settings.gadget.ts, vite.config.mts)
- ✅ Update project name and description to reflect standalone nature

### Task 6.3: Final Testing and Validation (1 SP) ✅
- ✅ Test backend TypeScript compilation and build process
- ✅ Test date-picker extension compilation and build
- ✅ Test shipping method function compilation and build
- ✅ Validate all build scripts work correctly
- ✅ Fix dependency issues with react-reconciler and @shopify/ui-extensions
- ✅ Ensure complete delivery date + shipping method workflow builds successfully

---

## Sprint 7: Direct API Integration (3 Story Points) ✅ COMPLETED

### Task 7.1: Extension API Client Enhancement (2 SP) ✅
- ✅ Update `extensions/date-picker/src/services/apiClient.ts` to support configurable API settings
- ✅ Add `saveOrderMetafields()` function for direct backend integration
- ✅ Implement proper TypeScript types and error handling
- ✅ Add support for both direct array and wrapped API responses

### Task 7.2: Extension Configuration Integration (1 SP) ✅
- ✅ Update `extensions/date-picker/src/index.tsx` to use extension settings
- ✅ Integrate `useSettings()` hook for merchant-configurable API URL and mock mode
- ✅ Update cart attribute keys to use `custom.` prefix
- ✅ Add direct backend synchronization for delivery dates and shipping methods
- ✅ Fix TypeScript linting errors and improve type safety

---

# 🚀 CLOUDFLARE WORKERS MIGRATION PLAN

---

## Sprint 8: Cloudflare Workers Foundation (6 Story Points) ✅ COMPLETED

### Task 8.1: Cloudflare Workers Project Setup (2 SP) ✅
- ✅ Create new `workers/` directory structure
- ✅ Initialize Cloudflare Workers project with Wrangler CLI
- ✅ Configure `wrangler.toml` with:
  ```toml
  name = "woood-delivery-api"
  main = "src/index.ts"
  compatibility_date = "2024-01-15"
  compatibility_flags = ["nodejs_compat"]

  [env.production]
  name = "woood-delivery-api"

  [env.staging]
  name = "woood-delivery-api-staging"
  ```
- ✅ Set up TypeScript configuration optimized for Workers runtime
- ✅ Create package.json with Workers-specific dependencies:
  ```json
  {
    "devDependencies": {
      "@cloudflare/workers-types": "^4.20240112.0",
      "wrangler": "^3.22.0",
      "typescript": "^5.0.0"
    }
  }
  ```

### Task 8.2: Environment Variables Migration (1 SP) ✅
- ✅ Migrate environment variables to Cloudflare Workers format
- ✅ Configure environment variable structure for Wrangler CLI deployment
- ✅ Set up environment-specific variables for development, staging, and production
- ✅ Create comprehensive environment type definitions for Workers with all feature flags

### Task 8.3: Core Worker Structure (2 SP) ✅
- ✅ Create `src/index.ts` main worker entry point with request routing
- ✅ Implement request router with placeholder endpoints for all API routes
- ✅ Implement CORS handling for Shopify domains
- ✅ Add request logging, error handling, and performance monitoring
- ✅ Export RateLimiter Durable Object class for rate limiting functionality

### Task 8.4: TypeScript Interfaces Migration (1 SP) ✅
- ✅ Migrate existing TypeScript interfaces to Workers format
- ✅ Create comprehensive common types for all API data structures
- ✅ Update interfaces for Workers-specific APIs with KV and Durable Objects support
- ✅ Build successful with TypeScript compilation and Wrangler validation

---

## Sprint 9: API Services Migration (8 Story Points) ✅ COMPLETED

### Task 9.1: Delivery Dates Service Migration (3 SP) ✅
- ✅ Migrated `deliveryDatesService.ts` to Workers format with comprehensive error handling
- ✅ Replaced Express-style error handling with Workers Response API
- ✅ Implemented Cloudflare KV storage for caching with structured cache entries
- ✅ Updated retry logic for Workers fetch API with exponential backoff
- ✅ Added `handleDeliveryDatesRequest()` function for complete endpoint handling
- ✅ Integrated with WorkerConfig for feature flag support

### Task 9.2: DutchNed API Client Migration (2 SP) ✅
- ✅ Migrated `dutchNedClient.ts` to use Workers fetch API with native AbortController
- ✅ Removed Node.js-specific imports and dependencies
- ✅ Implemented Workers-compatible authentication with proper headers
- ✅ Enhanced error handling and response validation
- ✅ Added `testDutchNedAPIConnection()` function for health checks
- ✅ Improved API response formatting with fallback handling

### Task 9.3: Shipping Method Service Migration (2 SP) ✅
- ✅ Migrated `shippingMethodService.ts` to Workers with full feature parity
- ✅ Implemented KV storage for shipping method data persistence with multiple TTL strategies
- ✅ Updated shipping method processing for Workers environment
- ✅ Added `handleShippingMethodRequest()` for complete endpoint handling
- ✅ Enhanced validation and error handling for Workers environment
- ✅ Integrated order metafields processing with Shopify Admin API simulation

### Task 9.4: Mock Data Generator Migration (1 SP) ✅
- ✅ Migrated `mockDataGenerator.ts` to Workers with V8 isolate optimizations
- ✅ Updated date formatting using Intl.DateTimeFormat with fallback support
- ✅ Ensured compatibility with V8 isolate environment
- ✅ Added utility functions for date validation and filtering
- ✅ Enhanced with `generateCustomMockDeliveryDates()` for flexible testing
- ✅ Implemented proper error handling for locale formatting

---

## Sprint 10: Workers Utilities and Middleware (5 Story Points) ✅ COMPLETED

### Task 10.1: Logging System Migration (2 SP) ✅
- ✅ Enhanced WorkersLogger with comprehensive external service integration
- ✅ Implemented structured logging with metadata sanitization and security
- ✅ Added support for external logging services (LogFlare, Datadog, NewRelic, Custom)
- ✅ Created child logger functionality for request-scoped contexts
- ✅ Added performance, cache, and request logging methods
- ✅ Implemented robust error handling with timeout protection

### Task 10.2: Rate Limiting with Durable Objects (2 SP) ✅
- ✅ Created enhanced RateLimiter Durable Object with advanced client identification
- ✅ Implemented RateLimitingService for integration with main worker
- ✅ Added automatic cleanup of old requests to prevent storage bloat
- ✅ Enhanced error handling with graceful fallbacks on storage failures
- ✅ Added admin functions for rate limit management and monitoring
- ✅ Integrated rate limit headers and response creation utilities

### Task 10.3: Feature Flags Migration (1 SP) ✅
- ✅ Created comprehensive WorkersFeatureFlags service with caching
- ✅ Implemented categorized feature flags (core, performance, UI, external, debug)
- ✅ Added environment-specific overrides for development/staging/production
- ✅ Created feature flag validation with warnings and recommendations
- ✅ Added statistics tracking for monitoring flag usage
- ✅ Implemented helper functions for bulk flag checking and fallback values

---

## Sprint 11: Workers Deployment and Configuration (4 Story Points) 🎯 PLANNED

### Task 11.1: Wrangler Configuration (1 SP)
- 🔄 Configure production and staging environments in `wrangler.toml`
- 🔄 Set up custom domains and routes
- 🔄 Configure KV namespaces:
  ```toml
  [[kv_namespaces]]
  binding = "DELIVERY_CACHE"
  id = "your-kv-namespace-id"
  preview_id = "your-preview-kv-namespace-id"

  [[durable_objects.bindings]]
  name = "RATE_LIMITER"
  class_name = "RateLimiter"
  ```
- 🔄 Set up environment-specific variables and secrets

### Task 11.2: Custom Domain Setup (1 SP)
- 🔄 Configure custom domain for Workers (e.g., `api.woood-delivery.com`)
- 🔄 Set up SSL certificates and DNS configuration
- 🔄 Configure route patterns for API endpoints
- 🔄 Set up staging subdomain (`staging-api.woood-delivery.com`)

### Task 11.3: Build and Deployment Scripts (1 SP)
- 🔄 Update root `package.json` with Workers build scripts:
  ```json
  {
    "scripts": {
      "build": "yarn build:workers && yarn build:extensions",
      "build:workers": "cd workers && wrangler build",
      "deploy:workers:staging": "cd workers && wrangler deploy --env staging",
      "deploy:workers:production": "cd workers && wrangler deploy --env production",
      "dev:workers": "cd workers && wrangler dev",
      "workers:logs": "cd workers && wrangler tail"
    }
  }
  ```
- 🔄 Create deployment documentation for Workers
- 🔄 Set up CI/CD pipeline with GitHub Actions for automatic deployment

### Task 11.4: Monitoring and Analytics Setup (1 SP)
- 🔄 Configure Cloudflare Analytics for Workers
- 🔄 Set up custom metrics and logging
- 🔄 Configure alerts for error rates and performance issues
- 🔄 Set up integration with external monitoring tools (optional)

---

## Sprint 12: Extension Updates and Testing (4 Story Points) 🎯 PLANNED

### Task 12.1: Extension Configuration Updates (1 SP)
- 🔄 Update default API base URL in extension settings to Workers domain
- 🔄 Update `extensions/date-picker/shopify.extension.toml`:
  ```toml
  [[extensions.settings.fields]]
  key = "api_base_url"
  type = "single_line_text_field"
  name = "API Base URL"
  description = "Base URL for the delivery dates API (e.g., https://api.woood-delivery.com)"
  ```
- 🔄 Update extension documentation to reflect Workers endpoints

### Task 12.2: API Client Compatibility Testing (1 SP)
- 🔄 Test extension API client with Workers endpoints
- 🔄 Verify CORS functionality with Shopify domains
- 🔄 Test error handling and fallback mechanisms
- 🔄 Validate response format compatibility

### Task 12.3: Performance Testing (1 SP)
- 🔄 Compare Workers vs Vercel performance metrics
- 🔄 Test global edge performance from different regions
- 🔄 Validate caching behavior with KV storage
- 🔄 Test rate limiting functionality

### Task 12.4: End-to-End Integration Testing (1 SP)
- 🔄 Test complete workflow: Extension → Workers → DutchNed API
- 🔄 Validate delivery date fetching and caching
- 🔄 Test shipping method processing and storage
- 🔄 Verify error tracking and logging functionality

---

## Sprint 13: Documentation and Migration (3 Story Points) 🎯 PLANNED

### Task 13.1: Workers Documentation (1 SP)
- 🔄 Create Workers-specific deployment guide
- 🔄 Document environment variable setup with Wrangler
- 🔄 Add troubleshooting guide for Workers-specific issues
- 🔄 Document KV storage management and monitoring

### Task 13.2: Migration Guide (1 SP)
- 🔄 Create step-by-step migration guide from Vercel to Workers
- 🔄 Document DNS changes and domain configuration
- 🔄 Create rollback procedures in case of issues
- 🔄 Document cost comparison and benefits analysis

### Task 13.3: Legacy Cleanup (1 SP)
- 🔄 Archive Vercel backend code (move to `legacy/` directory)
- 🔄 Update README.md to reflect Workers architecture
- 🔄 Remove Vercel-specific configuration files from root
- 🔄 Update project documentation and file structure diagrams

---

## Updated File Structure After Workers Migration

```
project-root/
├── workers/                          # 🆕 Cloudflare Workers API
│   ├── src/
│   │   ├── index.ts                 # Main worker entry point
│   │   ├── handlers/
│   │   │   ├── deliveryDates.ts
│   │   │   ├── shippingMethods.ts
│   │   │   └── health.ts
│   │   ├── services/
│   │   │   ├── deliveryDatesService.ts
│   │   │   ├── shippingMethodService.ts
│   │   │   └── featureFlagsService.ts
│   │   ├── api/
│   │   │   └── dutchNedClient.ts
│   │   ├── utils/
│   │   │   ├── mockDataGenerator.ts
│   │   │   ├── logger.ts
│   │   │   └── cors.ts
│   │   └── types/
│   │       └── env.ts
│   ├── wrangler.toml
│   ├── package.json
│   └── tsconfig.json
├── legacy/                           # 🆕 Archived Vercel backend
│   └── backend/                     # Moved from root level
├── extensions/                       # ✅ Unchanged (standalone)
│   ├── date-picker/
│   └── shipping-method/
├── README.md                        # 🔄 Updated for Workers
├── DEPLOYMENT.md                    # 🔄 Updated with Workers guide
└── package.json                     # 🔄 Updated build scripts
```

---

## Migration Benefits

### 🚀 **Performance Improvements**
- **Global Edge Network**: 300+ locations worldwide vs single region
- **Cold Start Reduction**: V8 isolates vs Docker containers (~100x faster)
- **Response Time**: <50ms globally vs regional latency
- **Caching**: Built-in KV storage vs in-memory (lost on restart)

### 💰 **Cost Optimization**
- **Request-based Pricing**: Pay per request vs always-on server
- **No Idle Costs**: Workers only run when needed
- **Built-in Features**: Free CORS, rate limiting, analytics
- **Estimated Savings**: 60-80% reduction in hosting costs

### 🛡️ **Enhanced Reliability**
- **99.99% Uptime SLA**: Cloudflare's global network reliability
- **DDoS Protection**: Built-in enterprise-level security
- **Auto-scaling**: Handles traffic spikes automatically
- **Zero Maintenance**: No server management required

### 🔧 **Developer Experience**
- **Instant Deployment**: `wrangler deploy` vs container builds
- **Local Development**: `wrangler dev` with hot reload
- **Built-in Analytics**: Real-time metrics and logging
- **TypeScript First**: Native TypeScript support

---

## Migration Story Points Summary

| Sprint | Focus Area | Story Points | Status |
|--------|------------|--------------|--------|
| Sprint 8 | Workers Foundation | 6 SP | ✅ Completed |
| Sprint 9 | API Services Migration | 8 SP | ✅ Completed |
| Sprint 10 | Utilities & Middleware | 5 SP | ✅ Completed |
| Sprint 11 | Deployment & Config | 4 SP | 🎯 Planned |
| Sprint 12 | Testing & Integration | 4 SP | 🎯 Planned |
| Sprint 13 | Documentation & Cleanup | 3 SP | 🎯 Planned |

**Total Migration Story Points:** 30 SP
**Estimated Timeline:** 4-5 weeks
**Extensions:** Remain unchanged (0 SP required)

---

## Migration Success Criteria

### ✅ **Functional Requirements**
- [ ] All existing API endpoints work identically on Workers
- [ ] Extensions continue to function without changes
- [ ] Response times improve globally
- [ ] Caching works with KV storage

### ✅ **Performance Requirements**
- [ ] <50ms response times globally
- [ ] 99.99% uptime maintained
- [ ] Rate limiting functions correctly
- [ ] No functionality regression

### ✅ **Operational Requirements**
- [ ] Deployment pipeline established
- [ ] Monitoring and alerting configured
- [ ] Documentation updated
- [ ] Cost reduction achieved (target: 60%+)

---

## Total Project Story Points: 62 SP ✅ 45 SP COMPLETED + 🎯 17 SP PLANNED
**Completed Timeline:** 7-8 weeks
**Migration Timeline:** 2-3 weeks remaining
**Total Project Timeline:** 9-11 weeks
