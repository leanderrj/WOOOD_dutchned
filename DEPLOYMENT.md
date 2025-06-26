# Deployment Guide

This guide covers the deployment of the WOOOD Delivery Date Picker application, which consists of a backend API proxy and Shopify checkout extensions.

## Architecture Overview

- **Backend**: Node.js Express server deployed on Vercel
- **Frontend**: Shopify Checkout UI Extensions (date-picker and shipping-method)
- **API Integration**: DutchNed delivery dates API with fallback to mock data

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Shopify CLI installed (`npm install -g @shopify/cli`)
- Vercel CLI installed (`npm install -g vercel`)
- Access to Shopify Partner Dashboard
- DutchNed API credentials

## Backend Deployment (Vercel)

### 1. Environment Variables

Set up the following environment variables in Vercel dashboard:

```bash
# API Configuration
DUTCHNED_API_URL=https://eekhoorn-connector.dutchned.com/api/delivery-dates/available
DUTCHNED_API_CREDENTIALS=YmFzaWM6YmwyMzFBU1hDMDk1M0pL
USE_MOCK_DELIVERY_DATES=false

# Cache and Performance
CACHE_DURATION=300000
API_TIMEOUT=10000
MAX_RETRIES=3

# CORS Configuration
CORS_ORIGINS=https://shop.app,https://checkout.shopify.com,https://*.myshopify.com

# Feature Flags
ENABLE_SHIPPING_OPTION_CHANGES=true
ENABLE_ORDER_METAFIELDS=true
ENABLE_SHIPPING_METHOD_LOGGING=true

# Server Configuration
PORT=3000
NODE_ENV=production
```

### 2. Deploy to Vercel

```bash
# Navigate to backend directory
cd backend

# Login to Vercel (if not already logged in)
vercel login

# Deploy to production
vercel --prod

# Set environment variables (alternative to dashboard)
vercel env add DUTCHNED_API_URL
vercel env add DUTCHNED_API_CREDENTIALS
# ... add all other variables
```

### 3. Verify Deployment

Test the deployed backend:

```bash
# Health check
curl https://your-backend.vercel.app/health

# Test delivery dates endpoint
curl https://your-backend.vercel.app/api/delivery-dates/available

# Test shipping method endpoint
curl -X POST https://your-backend.vercel.app/api/shipping-methods/process \
  -H "Content-Type: application/json" \
  -d '{"shippingMethod":"Test Method","timestamp":"2024-01-01T00:00:00Z"}'
```

## Shopify Extensions Deployment

### 1. Configure Extensions

Update the API base URL in both extensions:

```bash
# Date picker extension
cd extensions/date-picker
echo "VITE_API_BASE_URL=https://your-backend.vercel.app" > .env
echo "VITE_ENABLE_MOCK_MODE=false" >> .env

# Shipping method extension (if needed)
cd ../shipping-method
# No environment variables needed for this extension
```

### 2. Build Extensions

```bash
# From project root
npm run build:extensions

# Or individually
npm run build:date-picker
npm run build:shipping-method
```

### 3. Deploy to Shopify

```bash
# Deploy to development first
npm run shopify:deploy:development

# Deploy to production
npm run shopify:deploy:production
```

### 4. Configure Extension Settings

In the Shopify Partner Dashboard:

1. Navigate to your app
2. Go to Extensions section
3. Configure the date-picker extension settings:
   - **API Base URL**: `https://your-backend.vercel.app`
   - **Enable Mock Mode**: `false` (for production)

## Testing Deployment

### 1. Backend API Tests

```bash
# Test all endpoints
curl -f https://your-backend.vercel.app/health
curl -f https://your-backend.vercel.app/api/delivery-dates/available
curl -X POST -f https://your-backend.vercel.app/api/shipping-methods/process \
  -H "Content-Type: application/json" \
  -d '{"shippingMethod":"Standard","timestamp":"2024-01-01T00:00:00Z"}'
```

### 2. Extension Tests

1. Install the app in a development store
2. Navigate to checkout with Netherlands address
3. Verify date picker appears after shipping options
4. Test date selection and cart attribute saving
5. Test shipping method filtering based on product metafields

### 3. End-to-End Tests

1. Add products with shipping method metafields to cart
2. Proceed to checkout with Netherlands address
3. Verify correct shipping methods are shown/hidden
4. Select delivery date
5. Complete checkout
6. Verify order metafields are saved

## Monitoring and Maintenance

### Backend Monitoring

- Monitor Vercel function logs
- Set up alerts for API failures
- Monitor DutchNed API availability
- Track response times and error rates

### Extension Monitoring

- Monitor Shopify app analytics
- Track extension usage and errors
- Monitor cart attribute and order metafield data

### Health Checks

Set up automated health checks:

```bash
# Create a monitoring script
#!/bin/bash
curl -f https://your-backend.vercel.app/health || exit 1
curl -f https://your-backend.vercel.app/api/delivery-dates/available || exit 1
```

## Rollback Procedures

### Backend Rollback

```bash
# Rollback to previous deployment
vercel --prod --rollback
```

### Extension Rollback

```bash
# Redeploy previous version
git checkout previous-version
npm run shopify:deploy:production
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Verify CORS_ORIGINS environment variable includes your shop domain
2. **API Timeouts**: Check DutchNed API availability and increase API_TIMEOUT if needed
3. **Extension Not Loading**: Verify API base URL is correct and backend is accessible
4. **Mock Data Fallback**: Check if USE_MOCK_DELIVERY_DATES is set correctly

### Debug Mode

Enable debug logging by setting environment variables:

```bash
ENABLE_SHIPPING_METHOD_LOGGING=true
USE_MOCK_DELIVERY_DATES=true  # For testing
```

### Log Analysis

Check Vercel function logs:

```bash
vercel logs --follow
```

## Security Considerations

1. **API Credentials**: Store securely in Vercel environment variables
2. **CORS Configuration**: Restrict to necessary domains only
3. **Rate Limiting**: Consider implementing rate limiting for production
4. **HTTPS**: Ensure all communications use HTTPS
5. **Input Validation**: Backend validates all incoming requests

## Performance Optimization

1. **Caching**: 5-minute cache for delivery dates API
2. **Compression**: Vercel automatically compresses responses
3. **CDN**: Vercel provides global CDN for fast response times
4. **Bundle Size**: Extensions are optimized for minimal bundle size

## Scaling Considerations

1. **Vercel Limits**: Monitor function execution time and memory usage
2. **API Rate Limits**: Respect DutchNed API rate limits
3. **Concurrent Requests**: Backend handles concurrent requests efficiently
4. **Database**: Consider external database for persistent storage if needed 