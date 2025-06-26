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

# Rate Limiting
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX_REQUESTS=100

# Feature Flags
ENABLE_DELIVERY_DATE_PICKER=true
ENABLE_SHIPPING_METHOD_INTEGRATION=true
ENABLE_MOCK_FALLBACK=true
ENABLE_CACHING=true
ENABLE_RETRY_LOGIC=true
ENABLE_PERFORMANCE_MONITORING=true
ENABLE_ERROR_TRACKING=true
ENABLE_REQUEST_LOGGING=true
ENABLE_RATE_LIMITING=true
ENABLE_CORS_VALIDATION=true
ENABLE_DUTCH_LOCALE_FORMATTING=true
ENABLE_WEEKEND_FILTERING=true
ENABLE_EXTERNAL_API_INTEGRATION=true
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

# Test error tracking endpoint
curl -X POST https://your-backend.vercel.app/api/errors/track \
  -H "Content-Type: application/json" \
  -d '{"error":"Test error","context":{"component":"test"}}'

# Test order metafields endpoint
curl -X POST https://your-backend.vercel.app/api/order-metafields/save \
  -H "Content-Type: application/json" \
  -d '{"orderId":"test_123","deliveryDate":"2024-01-15","shippingMethod":"Standard"}'
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
yarn build:all

# Or individually
yarn build:backend
yarn build:date-picker
yarn build:shipping-method
```

### 3. Deploy to Shopify

```bash
# Deploy all extensions
shopify app deploy

# Or deploy specific extensions
shopify app deploy --extension-id=date-picker
shopify app deploy --extension-id=shipping-method
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
# Test all endpoints with comprehensive validation
curl -f https://your-backend.vercel.app/health
curl -f https://your-backend.vercel.app/api/delivery-dates/available
curl -X POST -f https://your-backend.vercel.app/api/shipping-methods/process \
  -H "Content-Type: application/json" \
  -d '{"shippingMethod":"Standard","timestamp":"2024-01-01T00:00:00Z"}'

# Test rate limiting
for i in {1..5}; do
  curl -f https://your-backend.vercel.app/health
done

# Test CORS headers
curl -H "Origin: https://shop.app" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: X-Requested-With" \
  -X OPTIONS https://your-backend.vercel.app/api/delivery-dates/available
```

### 2. Extension Tests

1. Install the app in a development store
2. Navigate to checkout with Netherlands address
3. Verify date picker appears after shipping options
4. Test date selection and cart attribute saving
5. Test shipping method filtering based on product metafields
6. Test error boundary functionality
7. Verify bilingual support (English/Dutch)

### 3. End-to-End Tests

1. Add products with shipping method metafields to cart
2. Proceed to checkout with Netherlands address
3. Verify correct shipping methods are shown/hidden
4. Select delivery date
5. Complete checkout
6. Verify order metafields are saved
7. Test fallback to mock data when API is unavailable

## Monitoring and Maintenance

### Backend Monitoring

- Monitor Vercel function logs
- Set up alerts for API failures
- Monitor DutchNed API availability
- Track response times and error rates
- Monitor cache hit rates
- Track feature flag usage

### Extension Monitoring

- Monitor Shopify app analytics
- Track extension usage and errors
- Monitor cart attribute and order metafield data
- Track user interaction patterns

### Performance Metrics

Monitor these key performance indicators:

- **API Response Time**: Target < 2 seconds
- **Cache Hit Rate**: Target > 80%
- **Error Rate**: Target < 1%
- **DutchNed API Availability**: Target > 99%
- **Extension Load Time**: Target < 1 second
- **Checkout Completion Rate**: Monitor for impact

### Health Checks

Set up automated health checks:

```bash
#!/bin/bash
# comprehensive-health-check.sh

echo "Checking backend health..."
curl -f https://your-backend.vercel.app/health || exit 1

echo "Checking delivery dates API..."
curl -f https://your-backend.vercel.app/api/delivery-dates/available || exit 1

echo "Checking shipping methods API..."
curl -X POST -f https://your-backend.vercel.app/api/shipping-methods/process \
  -H "Content-Type: application/json" \
  -d '{"shippingMethod":"Health Check","timestamp":"'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'"}' || exit 1

echo "Checking error tracking..."
curl -X POST -f https://your-backend.vercel.app/api/errors/track \
  -H "Content-Type: application/json" \
  -d '{"error":"Health check test","context":{"component":"health-check"}}' || exit 1

echo "All health checks passed!"
```

## Rollback Procedures

### Backend Rollback

```bash
# Rollback to previous deployment
vercel --prod --rollback

# Or rollback to specific deployment
vercel rollback [deployment-url] --prod
```

### Extension Rollback

```bash
# Redeploy previous version
git checkout previous-version
yarn build:all
shopify app deploy
```

### Emergency Rollback

```bash
#!/bin/bash
# emergency-rollback.sh

echo "Performing emergency rollback..."

# Rollback backend
vercel --prod --rollback

# Rollback extensions
git checkout HEAD~1
yarn build:all
shopify app deploy

echo "Emergency rollback complete!"
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Verify CORS_ORIGINS environment variable includes your shop domain
2. **API Timeouts**: Check DutchNed API availability and increase API_TIMEOUT if needed
3. **Extension Not Loading**: Verify API base URL is correct and backend is accessible
4. **Mock Data Fallback**: Check if USE_MOCK_DELIVERY_DATES is set correctly
5. **Rate Limiting**: Check if requests are being rate limited
6. **Feature Flags**: Verify all required feature flags are enabled

### Error Codes Reference

| Error Code | Description | Solution |
|------------|-------------|----------|
| `DUTCHNED_API_TIMEOUT` | DutchNed API timeout | Check network, increase timeout, verify API status |
| `DUTCHNED_API_ERROR` | DutchNed API error response | Verify credentials, check API documentation |
| `CACHE_ERROR` | Caching system error | Restart backend, check memory usage |
| `VALIDATION_ERROR` | Request validation failed | Check request format and required fields |
| `RATE_LIMIT_EXCEEDED` | Too many requests | Wait for reset, implement client throttling |
| `CORS_VIOLATION` | CORS policy violation | Update CORS_ORIGINS, verify request origin |
| `FEATURE_FLAG_DISABLED` | Required feature disabled | Enable feature flag in environment |
| `MOCK_DATA_FALLBACK` | Using mock data due to API failure | Check DutchNed API status, verify credentials |

### Debug Mode

Enable comprehensive debugging:

```bash
# Backend debugging
ENABLE_REQUEST_LOGGING=true
ENABLE_SHIPPING_METHOD_LOGGING=true
ENABLE_ERROR_TRACKING=true
USE_MOCK_DELIVERY_DATES=true  # For testing

# Extension debugging
VITE_ENABLE_MOCK_MODE=true
VITE_DEBUG_MODE=true
```

### Log Analysis

Check Vercel function logs:

```bash
# Follow live logs
vercel logs --follow

# Get logs for specific function
vercel logs --function=api/delivery-dates/available

# Filter logs by time
vercel logs --since=1h
```

### Performance Debugging

```bash
# Check response times
curl -w "@curl-format.txt" -o /dev/null -s https://your-backend.vercel.app/health

# Check memory usage
vercel logs --grep="memory"

# Check cache performance
curl -H "X-Debug: true" https://your-backend.vercel.app/api/delivery-dates/available
```

## Security Considerations

1. **API Credentials**: Store securely in Vercel environment variables
2. **CORS Configuration**: Restrict to necessary domains only
3. **Rate Limiting**: Implement rate limiting for production
4. **HTTPS**: Ensure all communications use HTTPS
5. **Input Validation**: Backend validates all incoming requests
6. **Error Information**: Don't expose sensitive information in errors
7. **Authentication**: API credentials are properly encoded
8. **Headers**: Security headers are properly configured

## Performance Optimization

1. **Caching**: 5-minute cache for delivery dates API
2. **Compression**: Vercel automatically compresses responses
3. **CDN**: Vercel provides global CDN for fast response times
4. **Bundle Size**: Extensions are optimized for minimal bundle size
5. **API Timeouts**: Configured for optimal user experience
6. **Retry Logic**: Exponential backoff for failed requests
7. **Mock Fallback**: Immediate fallback for better UX

## Scaling Considerations

1. **Vercel Limits**: Monitor function execution time and memory usage
2. **API Rate Limits**: Respect DutchNed API rate limits
3. **Concurrent Requests**: Backend handles concurrent requests efficiently
4. **Database**: Consider external database for persistent storage if needed
5. **Cache Strategy**: In-memory cache suitable for current scale
6. **Error Tracking**: Implement external error tracking service for scale
7. **Monitoring**: Set up comprehensive monitoring for production scale

## Maintenance Schedule

### Daily
- Check health endpoints
- Monitor error rates
- Review performance metrics

### Weekly
- Review Vercel usage and costs
- Check DutchNed API status
- Update dependencies if needed

### Monthly
- Review and update feature flags
- Performance optimization review
- Security audit
- Backup configuration

### Quarterly
- Full system health review
- Capacity planning
- Update documentation
- Security penetration testing 