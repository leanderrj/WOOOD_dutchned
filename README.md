# WOOOD Shopify Checkout Extension with Delivery Date Picker

## Project Overview

A standalone Shopify Checkout UI Extension system that provides delivery date selection and shipping method customization for WOOOD customers. The system consists of a serverless backend API, checkout UI extensions, and Shopify Functions for delivery customization.

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Shopify       │    │   Backend API    │    │   DutchNed      │
│   Checkout      │◄──►│   (Vercel)       │◄──►│   API           │
│   Extensions    │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │
         ▼                        ▼
┌─────────────────┐    ┌──────────────────┐
│   Shopify       │    │   Order          │
│   Functions     │    │   Metafields     │
│   (Delivery)    │    │                  │
└─────────────────┘    └──────────────────┘
```

## Components

### 1. Backend API (`/backend`)

A Node.js Express server deployed on Vercel that acts as a proxy between Shopify checkout extensions and the DutchNed delivery dates API.

**Key Features:**
- DutchNed API integration with authentication
- In-memory caching (5-minute TTL)
- Mock data fallback for development/failures
- Rate limiting and CORS protection
- Comprehensive error handling and logging
- Feature flags for runtime configuration

### 2. Date Picker Extension (`/extensions/date-picker`)

A Shopify Checkout UI Extension that allows customers to select delivery dates.

**Key Features:**
- Geographic activation (Netherlands only)
- Integration with backend API
- Fallback to mock dates if API fails
- Shipping method detection and saving
- Bilingual support (English/Dutch)
- Error boundaries and user-friendly error handling

### 3. Shipping Method Function (`/extensions/shipping-method`)

A Shopify Function that customizes delivery options based on product metafields.

**Key Features:**
- Product metafield-based shipping method filtering
- Dynamic delivery option renaming and pricing
- Priority-based shipping method selection
- Order metafield preservation for fulfillment

## API Endpoints

### Backend API (`https://your-backend.vercel.app`)

#### Health Check
```
GET /health
```
**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "version": "1.0.0"
}
```

#### Get Delivery Dates
```
GET /api/delivery-dates/available
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "date": "2024-01-15",
      "displayName": "maandag 15 januari"
    }
  ],
  "source": "api|mock|cache"
}
```

#### Process Shipping Methods
```
POST /api/shipping-methods/process
Content-Type: application/json

{
  "shippingMethod": "32 - EXPEDITIE 2-MANS",
  "orderId": "order_123",
  "metadata": {
    "cartId": "cart_456"
  }
}
```

#### Save Order Metafields
```
POST /api/order-metafields/save
Content-Type: application/json

{
  "orderId": "order_123",
  "deliveryDate": "2024-01-15",
  "shippingMethod": "32 - EXPEDITIE 2-MANS"
}
```

#### Track Errors
```
POST /api/errors/track
Content-Type: application/json

{
  "error": "API timeout",
  "context": {
    "component": "date-picker",
    "action": "fetchDeliveryDates"
  }
}
```

## Environment Variables

### Backend (`/backend/.env`)
```bash
# DutchNed API Configuration
DUTCHNED_API_URL=https://eekhoorn-connector.dutchned.com/api/delivery-dates/available
DUTCHNED_API_CREDENTIALS=YmFzaWM6YmwyMzFBU1hDMDk1M0pL

# Application Settings
USE_MOCK_DELIVERY_DATES=false
CACHE_DURATION=300000
API_TIMEOUT=10000
MAX_RETRIES=3

# CORS and Security
CORS_ORIGINS=https://shop.app,https://checkout.shopify.com,*.myshopify.com
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
```

### Date Picker Extension (`/extensions/date-picker/.env`)
```bash
VITE_API_BASE_URL=https://your-backend.vercel.app
VITE_ENABLE_MOCK_MODE=false
```

## Deployment

### Prerequisites
- Node.js 18+ 
- Yarn package manager
- Vercel account
- Shopify Partner account
- Shopify CLI

### Backend Deployment

1. **Deploy to Vercel:**
   ```bash
   cd backend
   vercel --prod
   ```

2. **Configure Environment Variables:**
   Set all required environment variables in Vercel dashboard.

3. **Verify Deployment:**
   ```bash
   curl https://your-backend.vercel.app/health
   ```

### Extension Deployment

1. **Build Extensions:**
   ```bash
   # From project root
   yarn build:all
   ```

2. **Deploy to Shopify:**
   ```bash
   shopify app deploy
   ```

3. **Configure Extension Settings:**
   - Set API base URL in extension settings
   - Configure geographic activation rules
   - Test in development store

### Complete Deployment Script

```bash
#!/bin/bash
# Deploy entire application

echo "Building all components..."
yarn build:all

echo "Deploying backend to Vercel..."
cd backend && vercel --prod && cd ..

echo "Deploying extensions to Shopify..."
shopify app deploy

echo "Running post-deployment tests..."
yarn test:deployment

echo "Deployment complete!"
```

## Development

### Local Development Setup

1. **Clone and Install:**
   ```bash
   git clone <repository>
   cd WOOOD_gadget
   yarn install
   ```

2. **Environment Setup:**
   ```bash
   cp backend/.env.example backend/.env
   cp extensions/date-picker/.env.example extensions/date-picker/.env
   # Edit .env files with your configuration
   ```

3. **Start Development Servers:**
   ```bash
   # Terminal 1: Backend
   cd backend && yarn dev

   # Terminal 2: Extensions
   shopify app dev
   ```

### Build Commands

```bash
# Build all components
yarn build:all

# Build individual components
yarn build:backend
yarn build:date-picker
yarn build:shipping-method

# Type checking
yarn type-check:all

# Clean builds
yarn clean:all
```

## Shipping Method Integration

### Product Configuration

Products must have a `custom.ShippingMethod2` metafield with priority-based values:

```
11 - PAKKET POST
15 - PAKKET POST GROOT  
30 - EXPEDITIE STANDAARD
31 - EXPEDITIE GESTOFFEERD
32 - EXPEDITIE 2-MANS
```

### Shipping Zone Setup

1. Create a single shipping rate named **"WOOOD Standard"** with handle `woood-standard`
2. The Shopify Function will dynamically rename and reprice this option
3. All other shipping options will be hidden when special shipping is required

### Business Logic Flow

1. **Cart Analysis:** Function inspects all cart items for `custom.ShippingMethod2` metafields
2. **Priority Selection:** Highest numerical priority wins (32 > 31 > 30, etc.)
3. **Option Transformation:** "WOOOD Standard" is renamed to match the required shipping method
4. **Metafield Preservation:** Original shipping method value is saved to order for fulfillment

## Troubleshooting

### Common Issues

#### Backend API Issues
```bash
# Check backend health
curl https://your-backend.vercel.app/health

# Check logs
vercel logs your-backend.vercel.app

# Test local backend
cd backend && yarn dev
curl http://localhost:3000/health
```

#### Extension Issues
```bash
# Check extension build
cd extensions/date-picker && yarn build

# View extension logs
shopify app logs --source=extensions

# Test in development store
shopify app dev --reset
```

#### DutchNed API Issues
```bash
# Test API directly
curl -H "Authorization: Basic YmFzaWM6YmwyMzFBU1hDMDk1M0pL" \
  https://eekhoorn-connector.dutchned.com/api/delivery-dates/available

# Enable mock mode
# Set USE_MOCK_DELIVERY_DATES=true in backend .env
```

### Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| `DUTCHNED_API_TIMEOUT` | DutchNed API timeout | Check network connectivity, API status |
| `DUTCHNED_API_ERROR` | DutchNed API error response | Verify API credentials, check API documentation |
| `CACHE_ERROR` | Caching system error | Restart backend, check memory usage |
| `VALIDATION_ERROR` | Request validation failed | Check request format, required fields |
| `RATE_LIMIT_EXCEEDED` | Too many requests | Wait for rate limit reset, implement client-side throttling |

### Performance Monitoring

Monitor these metrics:
- API response times (target: <2s)
- Cache hit rate (target: >80%)
- Error rate (target: <1%)
- DutchNed API availability (target: >99%)

### Security Considerations

- All API endpoints use CORS validation
- Rate limiting prevents abuse
- No sensitive data stored in extensions
- Authentication handled server-side only
- Input validation on all endpoints

## Contributing

### Code Style
- Use TypeScript strict mode
- Follow Shopify's coding standards
- Add comprehensive error handling
- Include JSDoc comments for public APIs

### Testing
```bash
# Run all tests
yarn test:all

# Test specific components
yarn test:backend
yarn test:extensions

# Integration tests
yarn test:integration
```

### Pull Request Process
1. Create feature branch from main
2. Implement changes with tests
3. Update documentation
4. Submit PR with detailed description
5. Address review feedback
6. Merge after approval

## License

This project is proprietary to WOOOD and not licensed for external use.

## Support

For technical support, contact the development team or create an issue in the project repository.
