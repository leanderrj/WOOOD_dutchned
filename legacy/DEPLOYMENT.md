# WOOOD Delivery Date Picker - Deployment Guide

This guide covers the complete deployment process for the WOOOD Delivery Date Picker system, including backend API proxy, Shopify extensions, and production configuration.

## Deployment Overview

The system consists of three deployable components:

1. **Backend API Proxy** → Vercel (Node.js serverless)
2. **Date Picker Extension** → Shopify App Store
3. **Shipping Method Function** → Shopify Functions

## Prerequisites

Before deploying, ensure you have:

- [ ] Node.js 18+ installed
- [ ] Yarn package manager
- [ ] Vercel CLI installed (`npm i -g vercel`)
- [ ] Shopify CLI installed (`npm i -g @shopify/cli`)
- [ ] Shopify Partner account with app created
- [ ] DutchNed API credentials
- [ ] Access to target Shopify store(s)

## Environment Setup

### 1. Backend Environment Variables

Create production environment variables for the backend:

```bash
# DutchNed API Configuration
DUTCHNED_API_URL=https://eekhoorn-connector.dutchned.com/api/delivery-dates/available
DUTCHNED_API_CREDENTIALS=YmFzaWM6YmwyMzFBU1hDMDk1M0pL

# API Configuration  
USE_MOCK_DELIVERY_DATES=false
CACHE_DURATION=300000
API_TIMEOUT=10000
MAX_RETRIES=3

# Server Configuration
PORT=3000
NODE_ENV=production
CORS_ORIGINS=https://shop.app,https://checkout.shopify.com,*.myshopify.com

# Feature Flags - Core Functionality
ENABLE_CACHING=true
ENABLE_DUTCHNED_API=true
ENABLE_MOCK_FALLBACK=true
ENABLE_SHIPPING_METHOD_PROCESSING=true

# Feature Flags - Performance & Monitoring
ENABLE_RATE_LIMITING=true
ENABLE_PERFORMANCE_MONITORING=true
ENABLE_REQUEST_LOGGING=true
ENABLE_ERROR_TRACKING=true

# Feature Flags - UI/UX
ENABLE_DETAILED_ERROR_MESSAGES=false
ENABLE_LOADING_STATES=true
ENABLE_USER_FEEDBACK=true

# Feature Flags - External Services
ENABLE_EXTERNAL_ERROR_REPORTING=false
ENABLE_ANALYTICS_TRACKING=false
ENABLE_WEBHOOK_NOTIFICATIONS=false

# Feature Flags - Debug & Development
ENABLE_DEBUG_LOGGING=false
ENABLE_VERBOSE_RESPONSES=false

# Rate Limiting Configuration
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_SKIP_SUCCESSFUL_REQUESTS=false
RATE_LIMIT_SKIP_FAILED_REQUESTS=false
```

### 2. Extension Environment Variables

Create production environment variables for the date picker extension:

```bash
# API Configuration
VITE_API_BASE_URL=https://woood-delivery-api.vercel.app
VITE_ENABLE_MOCK_MODE=false
```

## Backend Deployment (Vercel)

### Step 1: Prepare Backend for Deployment

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
yarn install
```

3. **Build and test locally:**
```bash
yarn build
yarn start
```

4. **Test endpoints:**
```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/delivery-dates/available
```

### Step 2: Deploy to Vercel

1. **Login to Vercel:**
```bash
vercel login
```

2. **Deploy to staging:**
```bash
vercel deploy
```

3. **Set environment variables:**
```bash
# Set all required environment variables
vercel env add DUTCHNED_API_URL
vercel env add DUTCHNED_API_CREDENTIALS
vercel env add USE_MOCK_DELIVERY_DATES
vercel env add CACHE_DURATION
vercel env add API_TIMEOUT
vercel env add MAX_RETRIES
vercel env add NODE_ENV
vercel env add CORS_ORIGINS
# ... continue for all environment variables
```

4. **Deploy to production:**
```bash
vercel deploy --prod
```

5. **Test production deployment:**
```bash
curl https://your-deployment-url.vercel.app/health
curl https://your-deployment-url.vercel.app/api/delivery-dates/available
```

### Step 3: Configure Custom Domain (Optional)

1. **Add custom domain in Vercel dashboard:**
   - Go to Vercel dashboard → Project → Settings → Domains
   - Add your custom domain (e.g., `woood-delivery-api.vercel.app`)
   - Configure DNS records as instructed

2. **Update CORS origins:**
```bash
vercel env add CORS_ORIGINS "https://shop.app,https://checkout.shopify.com,*.myshopify.com,https://your-custom-domain.com"
```

## Shopify Extensions Deployment

### Step 1: Prepare Shopify App

1. **Login to Shopify CLI:**
```bash
shopify auth login
```

2. **Navigate to project root:**
```bash
cd ..  # Back to project root
```

3. **Update extension configuration:**

Update `extensions/date-picker/.env`:
```bash
VITE_API_BASE_URL=https://your-production-backend.vercel.app
VITE_ENABLE_MOCK_MODE=false
```

### Step 2: Build and Test Extensions

1. **Build all extensions:**
```bash
yarn build
```

2. **Test date picker extension:**
```bash
cd extensions/date-picker
yarn build
shopify app dev
```

3. **Test shipping method function:**
```bash
cd ../shipping-method
yarn build
shopify app function run
```

### Step 3: Deploy Extensions

1. **Deploy all extensions:**
```bash
cd ../..  # Back to project root
shopify app deploy
```

2. **Confirm deployment:**
   - Follow CLI prompts to confirm deployment
   - Note the extension IDs provided after successful deployment

### Step 4: Configure Extensions in Shopify Admin

#### Date Picker Extension Configuration

1. **Access Shopify Admin:**
   - Go to your Shopify store admin
   - Navigate to Settings → Checkout

2. **Enable Date Picker Extension:**
   - Find "Date Picker for Delivery Dates" in checkout extensions
   - Enable the extension
   - Configure extension settings:
     - API Base URL: `https://your-production-backend.vercel.app`
     - Mock Mode: Disabled

3. **Test in checkout:**
   - Create a test order with Netherlands shipping address
   - Verify date picker appears and functions correctly

#### Shipping Method Function Configuration

1. **Install Shipping Method Function:**
   - Go to Settings → Shipping and delivery
   - Navigate to Shipping functions
   - Install "WOOOD Shipping Method Filter"

2. **Configure Shipping Zones:**
   - Create shipping rate named "WOOOD Standard"
   - Set handle to `woood-standard`
   - Configure pricing as needed

3. **Test shipping method filtering:**
   - Add products with `custom.ShippingMethod2` metafields to cart
   - Verify shipping options are filtered correctly

## Post-Deployment Configuration

### 1. Shopify Store Configuration

#### Required Metafields

Ensure the following product metafields are configured:

```json
{
  "namespace": "custom",
  "key": "ShippingMethod2", 
  "type": "single_line_text_field",
  "name": "Shipping Method Priority",
  "description": "Shipping method with priority (e.g., '32 - EXPEDITIE 2-MANS')"
}
```

#### Shipping Zone Setup

1. **Create shipping zones for Netherlands:**
   - Go to Settings → Shipping and delivery
   - Create zone for Netherlands
   - Add shipping rate "WOOOD Standard" with handle `woood-standard`

2. **Configure shipping rates:**
   - Set appropriate pricing for base rate
   - Function will dynamically rename and reprice based on cart contents

### 2. Monitoring and Alerts

#### Vercel Monitoring

1. **Enable Vercel Analytics:**
   - Go to Vercel dashboard → Project → Analytics
   - Enable Web Analytics and Speed Insights

2. **Set up monitoring alerts:**
   - Configure alerts for high error rates
   - Set up alerts for response time degradation
   - Monitor API usage and rate limiting

#### Shopify Function Monitoring

1. **Monitor function execution:**
   - Go to Shopify Admin → Apps → Functions
   - Monitor execution logs and error rates
   - Set up alerts for function failures

### 3. Performance Optimization

#### Backend Optimization

1. **Enable caching:**
```bash
ENABLE_CACHING=true
CACHE_DURATION=300000  # 5 minutes
```

2. **Configure rate limiting:**
```bash
ENABLE_RATE_LIMITING=true
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100
```

3. **Enable performance monitoring:**
```bash
ENABLE_PERFORMANCE_MONITORING=true
ENABLE_REQUEST_LOGGING=true
```

#### Frontend Optimization

1. **Minimize bundle size:**
   - Extensions are automatically optimized by Shopify
   - Ensure only necessary dependencies are included

2. **Enable error tracking:**
   - Frontend errors are automatically sent to backend `/api/errors/track`
   - Monitor error rates in backend logs

## Testing and Validation

### 1. End-to-End Testing

#### Test Scenarios

1. **Netherlands Address with Date Picker:**
   - Set shipping address to Netherlands
   - Verify date picker appears
   - Select delivery date
   - Complete checkout
   - Verify date saved as cart attribute

2. **Non-Netherlands Address:**
   - Set shipping address to other country
   - Verify date picker does not appear
   - Complete checkout normally

3. **Shipping Method Filtering:**
   - Add product with `custom.ShippingMethod2` metafield
   - Verify shipping options are filtered
   - Verify correct shipping method is selected
   - Complete checkout
   - Verify shipping method saved as order metafield

4. **API Fallback Testing:**
   - Temporarily disable DutchNed API
   - Verify fallback dates are generated
   - Verify checkout process continues normally

### 2. Performance Testing

#### Load Testing

1. **Backend API load testing:**
```bash
# Install artillery for load testing
npm install -g artillery

# Create load test configuration
cat > load-test.yml << EOF
config:
  target: 'https://your-backend.vercel.app'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: 'Test delivery dates API'
    requests:
      - get:
          url: '/api/delivery-dates/available'
      - get:
          url: '/health'
EOF

# Run load test
artillery run load-test.yml
```

2. **Monitor performance:**
   - Check response times under load
   - Verify caching is working effectively
   - Monitor error rates during high traffic

### 3. Security Testing

#### Security Checklist

- [ ] API credentials are stored as environment variables
- [ ] CORS is configured for Shopify domains only
- [ ] Rate limiting is enabled and configured
- [ ] HTTPS is enforced for all API communication
- [ ] Input validation is working for all endpoints
- [ ] Error messages don't expose sensitive information

## Rollback Procedures

### Backend Rollback

1. **Rollback to previous Vercel deployment:**
```bash
vercel rollback
```

2. **Or deploy specific version:**
```bash
vercel deploy --prod --force
```

### Extension Rollback

1. **Disable extensions in Shopify Admin:**
   - Go to Settings → Checkout
   - Disable problematic extensions

2. **Deploy previous version:**
```bash
git checkout previous-working-commit
shopify app deploy
```

## Maintenance and Updates

### Regular Maintenance Tasks

1. **Weekly:**
   - Review error logs in Vercel dashboard
   - Check Shopify function execution logs
   - Monitor API response times and error rates

2. **Monthly:**
   - Review and update dependencies
   - Check for Shopify API updates
   - Review and optimize feature flag configurations

3. **Quarterly:**
   - Performance review and optimization
   - Security audit and updates
   - Documentation updates

### Update Procedures

1. **Backend Updates:**
```bash
cd backend
yarn update
yarn build
yarn test
vercel deploy --prod
```

2. **Extension Updates:**
```bash
cd extensions/date-picker
yarn update
yarn build
cd ../shipping-method
yarn update
yarn build
cd ../..
shopify app deploy
```

## Troubleshooting Common Issues

### Deployment Issues

1. **Vercel deployment fails:**
   - Check build logs for errors
   - Verify all environment variables are set
   - Check for TypeScript compilation errors

2. **Extension deployment fails:**
   - Verify Shopify CLI is authenticated
   - Check extension configuration files
   - Ensure all required permissions are granted

3. **CORS errors in production:**
   - Verify CORS_ORIGINS includes all necessary domains
   - Check for typos in domain names
   - Ensure wildcard patterns are correctly formatted

### Runtime Issues

1. **Date picker not appearing:**
   - Verify customer address is Netherlands
   - Check browser console for errors
   - Verify extension is enabled in Shopify Admin

2. **API timeout errors:**
   - Check backend deployment status
   - Verify DutchNed API credentials
   - Enable mock mode as temporary fix

3. **Shipping method not filtering:**
   - Verify "WOOOD Standard" rate exists
   - Check product metafields are set correctly
   - Review function execution logs

## Support and Escalation

### Support Contacts

- **Technical Issues:** Development team
- **Shopify Issues:** Shopify Partner support
- **Vercel Issues:** Vercel support
- **DutchNed API Issues:** DutchNed support team

### Escalation Procedures

1. **Level 1:** Check logs and documentation
2. **Level 2:** Enable debug mode and gather detailed logs
3. **Level 3:** Contact appropriate support team with:
   - Error messages and logs
   - Steps to reproduce
   - Environment details
   - Impact assessment

---

## Deployment Checklist

### Pre-Deployment

- [ ] All tests pass locally
- [ ] Environment variables configured
- [ ] Dependencies updated and secure
- [ ] Documentation updated
- [ ] Backup procedures tested

### Deployment

- [ ] Backend deployed to Vercel
- [ ] Environment variables set in production
- [ ] Extensions deployed to Shopify
- [ ] Extensions configured in Shopify Admin
- [ ] Shipping zones configured correctly

### Post-Deployment

- [ ] End-to-end testing completed
- [ ] Performance monitoring enabled
- [ ] Error tracking configured
- [ ] Rollback procedures tested
- [ ] Team notified of deployment

### Go-Live

- [ ] Production testing with real orders
- [ ] Monitor error rates and performance
- [ ] Customer support team briefed
- [ ] Documentation accessible to support team

---

This deployment guide ensures a smooth and reliable deployment of the WOOOD Delivery Date Picker system to production environments. 