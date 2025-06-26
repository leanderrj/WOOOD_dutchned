# WOOOD Delivery Date Picker - Shopify Checkout Extension

A standalone Shopify Checkout UI Extension with delivery date picker that integrates with the DutchNed API for dynamic delivery date selection and shipping method customization.

## Overview

This project consists of three main components:
1. **Backend API Proxy** - Node.js/Express server that proxies requests to DutchNed API
2. **Date Picker Extension** - Shopify Checkout UI Extension for delivery date selection
3. **Shipping Method Function** - Shopify Function for dynamic shipping option filtering

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Shopify       │    │   Backend API   │    │   DutchNed      │
│   Checkout      │◄──►│   (Express)     │◄──►│   API           │
│   Extensions    │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │
        ▼
┌─────────────────┐
│   Shipping      │
│   Method        │
│   Function      │
└─────────────────┘
```

## Features

- 🗓️ **Dynamic Delivery Date Selection** - Customers can select preferred delivery dates
- 🚚 **Smart Shipping Method Filtering** - Automatic shipping option customization based on cart contents
- 🌍 **Geographic Targeting** - Only shows for Netherlands addresses
- ⚡ **Performance Optimized** - Caching, rate limiting, and fallback mechanisms
- 🛡️ **Error Resilient** - Comprehensive error handling with graceful fallbacks
- 🏗️ **Feature Flags** - Runtime configuration for all major features
- 📊 **Monitoring & Logging** - Structured logging and performance tracking

## Quick Start

### Prerequisites

- Node.js 18+ 
- Yarn or npm
- Shopify CLI
- Shopify Partner account
- Access to DutchNed API credentials

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd WOOOD_gadget
yarn install
```

2. **Setup environment variables:**
```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your DutchNed API credentials

# Date Picker Extension  
cp extensions/date-picker/.env.example extensions/date-picker/.env
# Edit with your backend API URL
```

3. **Build all components:**
```bash
yarn build
```

4. **Deploy backend to Vercel:**
```bash
cd backend
vercel deploy
```

5. **Deploy Shopify extensions:**
```bash
shopify app deploy
```

## Component Documentation

### 1. Backend API Proxy

**Location:** `backend/`

A Node.js/Express server that provides:
- Proxy endpoints for DutchNed API
- Caching and retry logic
- Rate limiting and security
- Error tracking and monitoring

#### API Endpoints

##### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 12345,
  "version": "1.0.0"
}
```

##### GET /api/delivery-dates/available
Fetch available delivery dates.

**Query Parameters:**
- `postalCode` (optional) - Customer postal code
- `country` (optional) - Customer country code

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "date": "2024-01-16",
      "displayName": "dinsdag 16 januari"
    },
    {
      "date": "2024-01-17", 
      "displayName": "woensdag 17 januari"
    }
  ],
  "cached": false,
  "source": "api"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "API_ERROR",
  "message": "Failed to fetch delivery dates",
  "fallback": true,
  "data": [...]
}
```

##### POST /api/shipping-methods/process
Process shipping method selection.

**Request Body:**
```json
{
  "shippingMethod": "32 - EXPEDITIE 2-MANS",
  "cartId": "cart_123",
  "customerId": "customer_456"
}
```

**Response:**
```json
{
  "success": true,
  "processed": true,
  "shippingMethod": "32 - EXPEDITIE 2-MANS"
}
```

##### GET /api/shipping-methods/:identifier
Retrieve shipping method data.

**Response:**
```json
{
  "success": true,
  "data": {
    "identifier": "cart_123",
    "shippingMethod": "32 - EXPEDITIE 2-MANS",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

##### POST /api/order-metafields/save
Save order metafields (combined endpoint).

**Request Body:**
```json
{
  "deliveryDate": "2024-01-16",
  "shippingMethod": "32 - EXPEDITIE 2-MANS",
  "orderId": "order_123"
}
```

##### POST /api/errors/track
Track frontend errors.

**Request Body:**
```json
{
  "error": "API_TIMEOUT",
  "message": "Request timeout after 15 seconds",
  "stack": "Error stack trace...",
  "userAgent": "Mozilla/5.0...",
  "url": "https://checkout.shopify.com/...",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### Environment Variables

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

# Feature Flags (see Feature Flags section for complete list)
ENABLE_CACHING=true
ENABLE_RATE_LIMITING=true
ENABLE_PERFORMANCE_MONITORING=true
# ... (15+ more feature flags)
```

### 2. Date Picker Extension

**Location:** `extensions/date-picker/`

A Shopify Checkout UI Extension that:
- Renders delivery date picker for Netherlands addresses
- Fetches dates from backend API with fallback
- Integrates with shipping method detection
- Saves selections as cart attributes

#### Key Features

- **Geographic Filtering:** Only shows for Netherlands (`NL`) addresses
- **API Integration:** Fetches delivery dates from backend with 15-second timeout
- **Fallback Mechanism:** Generates mock dates if API fails
- **Error Handling:** React Error Boundary with user-friendly messages
- **Shipping Integration:** Detects and saves selected shipping methods
- **Localization:** English and Dutch language support

#### Environment Variables

```bash
# API Configuration
VITE_API_BASE_URL=https://your-backend.vercel.app
VITE_ENABLE_MOCK_MODE=false
```

#### Cart Attributes Saved

- `custom.dutchned_delivery_date` - Selected delivery date (YYYY-MM-DD)
- `custom.selected_shipping_method` - Selected shipping method identifier

### 3. Shipping Method Function

**Location:** `extensions/shipping-method/`

A Shopify Function that:
- Filters delivery options based on cart product metafields
- Renames placeholder shipping rates dynamically
- Prioritizes shipping methods by numerical priority
- Saves shipping method data as checkout attributes

#### Business Logic

1. **Find Placeholder:** Searches for delivery option with handle `woood-standard`
2. **Highest Priority Wins:** Inspects `custom.ShippingMethod2` metafield on cart items
3. **Transform or Pass Through:** 
   - If high-priority shipping method found: renames and reprices placeholder, hides others
   - If no metafields found: leaves "WOOOD Standard" as default
4. **Error Handling:** Hides placeholder if required shipping method not found
5. **Preserve Data:** Saves original metafield value as checkout attribute

#### Metafield Examples

- `11 - PAKKET POST`
- `15 - PAKKET POST GROOT` 
- `30 - EXPEDITIE STANDAARD`
- `31 - EXPEDITIE GESTOFFEERD`
- `32 - EXPEDITIE 2-MANS`

## Feature Flags

The backend supports 15+ feature flags for runtime configuration:

### Core Functionality
- `ENABLE_CACHING` - Enable/disable API response caching
- `ENABLE_DUTCHNED_API` - Enable/disable DutchNed API integration
- `ENABLE_MOCK_FALLBACK` - Enable/disable mock data fallback
- `ENABLE_SHIPPING_METHOD_PROCESSING` - Enable/disable shipping method processing

### Performance & Monitoring  
- `ENABLE_RATE_LIMITING` - Enable/disable rate limiting
- `ENABLE_PERFORMANCE_MONITORING` - Enable/disable performance tracking
- `ENABLE_REQUEST_LOGGING` - Enable/disable request logging
- `ENABLE_ERROR_TRACKING` - Enable/disable error tracking

### UI/UX Features
- `ENABLE_DETAILED_ERROR_MESSAGES` - Show detailed vs generic errors
- `ENABLE_LOADING_STATES` - Show loading indicators
- `ENABLE_USER_FEEDBACK` - Enable user feedback collection

### External Services
- `ENABLE_EXTERNAL_ERROR_REPORTING` - Send errors to external services
- `ENABLE_ANALYTICS_TRACKING` - Track analytics events
- `ENABLE_WEBHOOK_NOTIFICATIONS` - Send webhook notifications

### Debug & Development
- `ENABLE_DEBUG_LOGGING` - Enable debug-level logging
- `ENABLE_VERBOSE_RESPONSES` - Include extra response metadata

## Deployment

### Backend Deployment (Vercel)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
cd backend
vercel deploy --prod
```

3. **Set environment variables in Vercel dashboard or CLI:**
```bash
vercel env add DUTCHNED_API_URL
vercel env add DUTCHNED_API_CREDENTIALS
# ... add all required environment variables
```

### Shopify Extensions Deployment

1. **Login to Shopify CLI:**
```bash
shopify auth login
```

2. **Deploy extensions:**
```bash
shopify app deploy
```

3. **Configure in Shopify Admin:**
   - Go to Settings → Checkout
   - Enable the Date Picker extension
   - Configure shipping zones with "WOOOD Standard" placeholder rate
   - Install and configure the Shipping Method function

## Development

### Local Development

1. **Start backend server:**
```bash
cd backend
yarn dev
```

2. **Start extension development:**
```bash
cd extensions/date-picker
yarn dev
```

3. **Test shipping method function:**
```bash
cd extensions/shipping-method
yarn build
shopify app function run
```

### Build Commands

```bash
# Build all components
yarn build

# Build individual components
yarn build:backend
yarn build:date-picker
yarn build:shipping-method

# Type checking
yarn type-check
yarn type-check:backend
yarn type-check:date-picker
yarn type-check:shipping-method

# Clean build artifacts
yarn clean
```

## Troubleshooting

### Common Issues

#### 1. Extension Not Showing in Checkout

**Symptoms:** Date picker doesn't appear in checkout

**Solutions:**
- Verify customer shipping address is Netherlands (`NL`)
- Check extension is enabled in Shopify Admin → Settings → Checkout
- Verify extension deployment was successful
- Check browser console for JavaScript errors

#### 2. API Timeout Errors

**Symptoms:** "Failed to load delivery dates" error

**Solutions:**
- Check backend deployment status and logs
- Verify DutchNed API credentials are correct
- Increase API timeout in environment variables
- Enable mock mode as temporary workaround:
  ```bash
  VITE_ENABLE_MOCK_MODE=true
  ```

#### 3. Shipping Method Not Updating

**Symptoms:** Shipping options not filtering correctly

**Solutions:**
- Verify "WOOOD Standard" shipping rate exists in Shopify Admin
- Check product metafields `custom.ShippingMethod2` are set correctly
- Review shipping method function logs in Shopify Admin
- Ensure function is installed and active

#### 4. CORS Errors

**Symptoms:** Cross-origin request blocked errors

**Solutions:**
- Update CORS_ORIGINS environment variable to include your domains
- Verify backend deployment includes proper CORS configuration
- Check Shopify checkout domain is whitelisted

#### 5. Rate Limiting Issues

**Symptoms:** 429 Too Many Requests errors

**Solutions:**
- Increase rate limits in environment variables:
  ```bash
  RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
  RATE_LIMIT_MAX_REQUESTS=200  # 200 requests per window
  ```
- Implement request queuing in frontend
- Contact support for rate limit increases

### Debug Mode

Enable debug logging for detailed troubleshooting:

```bash
# Backend
ENABLE_DEBUG_LOGGING=true
ENABLE_VERBOSE_RESPONSES=true

# Frontend  
VITE_ENABLE_MOCK_MODE=true
```

### Health Checks

Monitor system health:

```bash
# Backend health
curl https://your-backend.vercel.app/health

# Check API endpoints
curl https://your-backend.vercel.app/api/delivery-dates/available
```

### Logs and Monitoring

- **Vercel Logs:** Check Vercel dashboard for backend logs
- **Shopify Function Logs:** Available in Shopify Admin → Apps → Functions
- **Browser Console:** Check for frontend errors and network requests
- **Error Tracking:** Configure external error reporting services

## API Integration Details

### DutchNed API Integration

The backend integrates with DutchNed's delivery date API:

- **Endpoint:** `https://eekhoorn-connector.dutchned.com/api/delivery-dates/available`
- **Authentication:** Basic authentication with base64 encoded credentials
- **Timeout:** 10 seconds with 3 retry attempts
- **Caching:** 5-minute in-memory cache to reduce API calls
- **Fallback:** Mock data generation if API unavailable

### Shopify Integration

#### Checkout UI Extensions
- **Target:** `purchase.checkout.delivery-address.render-after`
- **Permissions:** `read_delivery_groups`, `write_cart_attributes`
- **API Version:** `2024-01`

#### Shopify Functions
- **Type:** `delivery_customization`
- **Input:** Cart line items with metafields
- **Output:** Modified delivery options
- **API Version:** `2024-01`

## Security Considerations

- **API Credentials:** Stored as environment variables, never in code
- **CORS:** Restricted to Shopify domains only
- **Rate Limiting:** Prevents API abuse
- **Input Validation:** All user inputs validated and sanitized
- **Error Handling:** No sensitive information exposed in error messages
- **HTTPS Only:** All API communication over HTTPS

## Performance Optimization

- **Caching:** 5-minute cache for delivery dates API
- **CDN:** Static assets served via Vercel Edge Network
- **Compression:** Gzip compression enabled
- **Rate Limiting:** Prevents excessive API calls
- **Lazy Loading:** Extensions loaded only when needed
- **Fallback Data:** Prevents blocking checkout process

## Support

For technical support:

1. Check this documentation and troubleshooting guide
2. Review logs in Vercel dashboard and Shopify Admin
3. Test with debug mode enabled
4. Contact development team with:
   - Error messages and logs
   - Steps to reproduce
   - Environment details
   - Browser/device information

## License

This project is proprietary software developed for WOOOD.

---

## Development Team

Built with ❤️ for seamless delivery date selection and shipping method customization.
