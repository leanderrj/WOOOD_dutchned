import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { getDeliveryDates } from './services/deliveryDatesService';
import { 
  processShippingMethodSelection, 
  getShippingMethodData, 
  getFeatureFlagsFromEnv 
} from './services/shippingMethodService';
import { 
  logger, 
  errorTracker, 
  generateRequestId, 
  performanceMonitor,
  LogMetadata 
} from './utils/logger';
import { getFeatureFlags, isFeatureEnabled } from './services/featureFlagsService';
import { apiRateLimit, generalRateLimit } from './middleware/rateLimiter';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Logger is now imported from utils/logger

// Middleware
app.use(helmet());

// CORS configuration
const corsOrigins = process.env.CORS_ORIGINS?.split(',') || [
  'https://shop.app',
  'https://checkout.shopify.com',
  'https://*.myshopify.com',
  'http://localhost:3000'
];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin matches any allowed patterns
    const isAllowed = corsOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        // Handle wildcard patterns like *.myshopify.com
        const pattern = allowedOrigin.replace(/\*/g, '.*');
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(origin);
      }
      return allowedOrigin === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// Apply rate limiting
app.use(generalRateLimit.middleware());

// Apply stricter rate limiting to API endpoints
app.use('/api/', apiRateLimit.middleware());

// Request logging middleware with correlation ID
app.use((req: any, res, next) => {
  req.requestId = generateRequestId();
  
  logger.info(`${req.method} ${req.path}`, {
    requestId: req.requestId,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    method: req.method,
    endpoint: req.path
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      useMockData: process.env.USE_MOCK_DELIVERY_DATES === 'true'
    }
  });
});

// Main delivery dates endpoint
app.get('/api/delivery-dates/available', async (req: any, res) => {
  const requestId = req.requestId || generateRequestId();
  const operationLabel = `delivery-dates-${requestId}`;

  logger.info('Processing delivery dates request', {
    requestId,
    userAgent: req.get('User-Agent'),
    ip: req.ip
  });

  try {
    // Performance monitoring
    const deliveryDates = await performanceMonitor.measureAsync(
      operationLabel,
      () => getDeliveryDates(logger)
    );

    // Set caching headers if caching is enabled
    if (isFeatureEnabled('enableCaching')) {
      const cacheTimeout = getFeatureFlags().cacheTimeout / 1000; // Convert to seconds
      res.set({
        'Cache-Control': `public, max-age=${cacheTimeout}`,
        'ETag': `"${Date.now()}-${deliveryDates.length}"`,
        'Last-Modified': new Date().toUTCString()
      });
    }

    // Set performance headers
    if (isFeatureEnabled('enablePerformanceMonitoring')) {
      res.set({
        'X-Response-Time': `${Date.now() - Date.now()}ms`,
        'X-Request-ID': requestId
      });
    }

    logger.info('Successfully processed delivery dates request', {
      requestId,
      resultCount: deliveryDates.length,
      cacheEnabled: isFeatureEnabled('enableCaching')
    });

    res.json(deliveryDates);
  } catch (error: any) {
    // Track error with context
    errorTracker.trackError(error, {
      requestId,
      endpoint: '/api/delivery-dates/available',
      method: 'GET',
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    logger.error('Failed to process delivery dates request', {
      requestId,
      error: error.message,
      errorStack: error.stack
    });

    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch delivery dates',
      requestId,
      timestamp: new Date().toISOString()
    });
  }
});

// Shipping method endpoints
app.post('/api/shipping-methods/process', async (req, res) => {
  const requestId = Math.random().toString(36).substring(7);
  const startTime = Date.now();

  logger.info('Processing shipping method request', {
    requestId,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    hasBody: !!req.body
  });

  try {
    const { shippingMethod, deliveryDate, cartId, orderId } = req.body;
    
    if (!shippingMethod) {
      return res.status(400).json({
        error: 'Bad request',
        message: 'shipping method is required',
        requestId,
        timestamp: new Date().toISOString()
      });
    }

    const featureFlags = getFeatureFlagsFromEnv();
    const shippingMethodData = {
      shippingMethod,
      deliveryDate,
      cartId,
      orderId,
      timestamp: new Date().toISOString()
    };

    const result = await processShippingMethodSelection(shippingMethodData, logger, featureFlags);
    const responseTime = Date.now() - startTime;

    logger.info('Completed shipping method processing', {
      requestId,
      responseTime,
      success: result.success,
      shippingMethod: result.data?.shippingMethod
    });

    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({
        ...result,
        requestId,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    
    logger.error('Failed to process shipping method request', {
      requestId,
      error: error.message,
      errorStack: error.stack,
      responseTime
    });

    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process shipping method',
      requestId,
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/api/shipping-methods/:identifier', async (req, res) => {
  const requestId = Math.random().toString(36).substring(7);
  const startTime = Date.now();
  const { identifier } = req.params;

  logger.info('Retrieving shipping method data', {
    requestId,
    identifier,
    userAgent: req.get('User-Agent'),
    ip: req.ip
  });

  try {
    const data = await getShippingMethodData(identifier, logger);
    const responseTime = Date.now() - startTime;

    logger.info('Completed shipping method data retrieval', {
      requestId,
      identifier,
      responseTime,
      found: !!data
    });

    if (data) {
      res.json({
        success: true,
        data,
        requestId,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(404).json({
        error: 'Not found',
        message: 'Shipping method data not found',
        requestId,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    
    logger.error('Failed to retrieve shipping method data', {
      requestId,
      identifier,
      error: error.message,
      errorStack: error.stack,
      responseTime
    });

    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve shipping method data',
      requestId,
      timestamp: new Date().toISOString()
    });
  }
});

// Combined endpoint for saving both delivery date and shipping method
app.post('/api/order-metafields/save', async (req, res) => {
  const requestId = Math.random().toString(36).substring(7);
  const startTime = Date.now();

  logger.info('Processing order metafields save request', {
    requestId,
    userAgent: req.get('User-Agent'),
    ip: req.ip
  });

  try {
    const { deliveryDate, shippingMethod, cartId, orderId } = req.body;
    
    if (!deliveryDate && !shippingMethod) {
      return res.status(400).json({
        error: 'Bad request',
        message: 'At least one of delivery date or shipping method is required',
        requestId,
        timestamp: new Date().toISOString()
      });
    }

    const featureFlags = getFeatureFlagsFromEnv();
    
    // Process shipping method if provided
    if (shippingMethod) {
      const shippingMethodData = {
        shippingMethod,
        deliveryDate,
        cartId,
        orderId,
        timestamp: new Date().toISOString()
      };

      await processShippingMethodSelection(shippingMethodData, logger, featureFlags);
    }

    const responseTime = Date.now() - startTime;

    logger.info('Successfully processed order metafields save', {
      requestId,
      responseTime,
      hasDeliveryDate: !!deliveryDate,
      hasShippingMethod: !!shippingMethod
    });

    res.json({
      success: true,
      message: 'Order metafields processed successfully',
      data: {
        deliveryDate,
        shippingMethod,
        timestamp: new Date().toISOString()
      },
      requestId
    });

  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    
    logger.error('Failed to process order metafields save', {
      requestId,
      error: error.message,
      errorStack: error.stack,
      responseTime
    });

    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process order metafields',
      requestId,
      timestamp: new Date().toISOString()
    });
  }
});

// Error tracking endpoint for frontend extensions
app.post('/api/errors/track', async (req: any, res) => {
  const requestId = req.requestId || generateRequestId();
  const startTime = Date.now();

  logger.info('Processing error tracking request', {
    requestId,
    userAgent: req.get('User-Agent'),
    ip: req.ip
  });

  try {
    const errorData = req.body;
    
    // Validate error data
    if (!errorData.name || !errorData.message) {
      return res.status(400).json({
        error: 'Bad request',
        message: 'Error name and message are required',
        requestId,
        timestamp: new Date().toISOString()
      });
    }

    // Enhance error data with server context
    const enhancedErrorData = {
      ...errorData,
      serverRequestId: requestId,
      serverTimestamp: new Date().toISOString(),
      clientIp: req.ip,
      userAgent: req.get('User-Agent'),
      referer: req.get('Referer')
    };

    // Track the error
    const error = new Error(errorData.message);
    error.name = errorData.name;
    error.stack = errorData.stack;

    errorTracker.trackError(error, {
      requestId,
      endpoint: '/api/errors/track',
      method: 'POST',
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      additionalData: enhancedErrorData
    });

    const responseTime = Date.now() - startTime;

    logger.info('Successfully processed error tracking', {
      requestId,
      responseTime,
      errorType: errorData.name,
      source: errorData.source || 'unknown'
    });

    res.json({
      success: true,
      message: 'Error tracked successfully',
      errorId: enhancedErrorData.errorId || requestId,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    
    logger.error('Failed to process error tracking request', {
      requestId,
      error: error.message,
      errorStack: error.stack,
      responseTime
    });

    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to track error',
      requestId,
      timestamp: new Date().toISOString()
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  logger.warn('Route not found', {
    method: req.method,
    path: req.originalUrl,
    ip: req.ip
  });

  res.status(404).json({
    error: 'Not found',
    message: 'The requested endpoint does not exist',
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error', {
    error: error.message,
    errorStack: error.stack,
    method: req.method,
    path: req.originalUrl,
    ip: req.ip
  });

  if (res.headersSent) {
    return next(error);
  }

  res.status(500).json({
    error: 'Internal server error',
    message: 'An unexpected error occurred',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(port, () => {
  logger.info(`Server started successfully`, {
    port,
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    corsOrigins,
    useMockData: process.env.USE_MOCK_DELIVERY_DATES === 'true'
  });
});

export default app; 