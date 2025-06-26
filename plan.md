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

## Sprint 6: Documentation and Cleanup (3 Story Points)

### Task 6.1: Technical Documentation (1 SP)
- Create comprehensive README.md
- Document API endpoints and responses
- Add troubleshooting guide
- Document deployment process
- Document shipping method function integration

### Task 6.2: Code Cleanup (1 SP)
- Remove all Gadget-related files and dependencies
- Clean up unused imports and code
- Add TypeScript strict mode
- Code review and refactoring

### Task 6.3: Final Testing and Validation (1 SP)
- End-to-end testing in staging environment
- Performance testing under load
- Security review
- Final deployment to production
- Test complete delivery date + shipping method workflow

---

## File Structure

```
project-root/
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   ├── services/
│   │   │   ├── deliveryDatesService.ts
│   │   │   └── shippingMethodService.ts
│   │   ├── api/
│   │   │   └── dutchNedClient.ts
│   │   └── utils/
│   │       └── mockDataGenerator.ts
│   ├── package.json
│   ├── .env.example
│   ├── .env
│   ├── vercel.json
│   └── tsconfig.json
├── extensions/
│   ├── date-picker/
│   │   ├── src/
│   │   │   ├── index.tsx
│   │   │   └── services/
│   │   │       └── apiClient.ts
│   │   ├── locales/
│   │   │   ├── en.json
│   │   │   └── nl.default.json
│   │   ├── package.json
│   │   ├── .env.example
│   │   ├── .env
│   │   └── shopify.extension.toml
│   └── shipping-method/
│       ├── src/
│       │   ├── index.ts
│       │   └── shipping_method_filter.graphql
│       ├── package.json
│       ├── shopify.extension.toml
│       └── schema.graphql
└── README.md
```

---

## Total Story Points: 32 SP
**Estimated Timeline:** 5-6 weeks (assuming 5-7 SP per week)

## Success Criteria
- ✅ Extension renders only for Netherlands addresses
- ✅ Delivery dates fetched from DutchNed API via proxy
- ✅ Fallback to mock data when API fails
- ✅ Selected date saved as cart attribute
- ✅ Shipping method selection based on product metafields
- ✅ Selected shipping method saved as order metafield
- ✅ Shipping method function filters delivery options correctly
- ✅ Minimal hosting costs (serverless backend)
- ✅ No dependency on external platforms beyond Shopify
