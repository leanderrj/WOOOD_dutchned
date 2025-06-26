export interface ShippingMethodData {
  shippingMethod: string;
  deliveryDate?: string;
  timestamp: string;
  cartId?: string;
  orderId?: string;
}

export interface ShippingMethodProcessResult {
  success: boolean;
  message: string;
  data?: {
    shippingMethod: string;
    deliveryDate?: string;
    timestamp: string;
  };
  error?: string;
}

interface Logger {
  info: (message: string, meta?: any) => void;
  warn: (message: string, meta?: any) => void;
  error: (message: string, meta?: any) => void;
}

interface FeatureFlags {
  enableShippingOptionChanges: boolean;
  enableOrderMetafields: boolean;
  enableLogging: boolean;
}

// In-memory storage for shipping method data (in production, use a database)
const shippingMethodStorage = new Map<string, ShippingMethodData>();

export async function processShippingMethodSelection(
  data: ShippingMethodData,
  logger: Logger,
  featureFlags: FeatureFlags = getDefaultFeatureFlags()
): Promise<ShippingMethodProcessResult> {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7);

  if (featureFlags.enableLogging) {
    logger.info('Processing shipping method selection', {
      requestId,
      shippingMethod: data.shippingMethod,
      timestamp: data.timestamp,
      hasDeliveryDate: !!data.deliveryDate,
      startTime
    });
  }

  try {
    // Feature flag check for shipping option changes
    if (!featureFlags.enableShippingOptionChanges) {
      logger.warn('Shipping option changes are disabled by feature flag', {
        requestId,
        featureFlag: 'enableShippingOptionChanges'
      });
      return {
        success: false,
        message: 'Shipping option changes are currently disabled',
        error: 'Feature flag disabled'
      };
    }

    // Validate input data
    const validationResult = validateShippingMethodData(data);
    if (!validationResult.isValid) {
      logger.error('Invalid shipping method data', {
        requestId,
        errors: validationResult.errors,
        data
      });
      return {
        success: false,
        message: 'Invalid shipping method data',
        error: validationResult.errors.join(', ')
      };
    }

    // Store shipping method data
    const storageKey = data.cartId || data.orderId || requestId;
    shippingMethodStorage.set(storageKey, {
      ...data,
      timestamp: new Date().toISOString()
    });

    // Process order metafields if enabled
    if (featureFlags.enableOrderMetafields && data.orderId) {
      await processOrderMetafields(data, logger, requestId);
    }

    const executionTime = Date.now() - startTime;
    
    if (featureFlags.enableLogging) {
      logger.info('Successfully processed shipping method selection', {
        requestId,
        shippingMethod: data.shippingMethod,
        executionTime,
        stored: true,
        orderMetafieldsProcessed: featureFlags.enableOrderMetafields && !!data.orderId
      });
    }

    return {
      success: true,
      message: 'Shipping method processed successfully',
      data: {
        shippingMethod: data.shippingMethod,
        deliveryDate: data.deliveryDate,
        timestamp: data.timestamp
      }
    };

  } catch (error: any) {
    const executionTime = Date.now() - startTime;
    
    logger.error('Error processing shipping method selection', {
      requestId,
      error: error.message,
      errorStack: error.stack,
      executionTime,
      data
    });

    return {
      success: false,
      message: 'Failed to process shipping method',
      error: error.message
    };
  }
}

export async function getShippingMethodData(
  identifier: string,
  logger: Logger
): Promise<ShippingMethodData | null> {
  try {
    const data = shippingMethodStorage.get(identifier);
    
    if (data) {
      logger.info('Retrieved shipping method data', {
        identifier,
        shippingMethod: data.shippingMethod,
        hasDeliveryDate: !!data.deliveryDate
      });
    } else {
      logger.warn('Shipping method data not found', { identifier });
    }

    return data || null;
  } catch (error: any) {
    logger.error('Error retrieving shipping method data', {
      identifier,
      error: error.message,
      errorStack: error.stack
    });
    return null;
  }
}

function validateShippingMethodData(data: ShippingMethodData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.shippingMethod || typeof data.shippingMethod !== 'string') {
    errors.push('shipping method is required and must be a string');
  }

  if (!data.timestamp || typeof data.timestamp !== 'string') {
    errors.push('timestamp is required and must be a string');
  } else {
    const timestamp = new Date(data.timestamp);
    if (isNaN(timestamp.getTime())) {
      errors.push('timestamp must be a valid ISO date string');
    }
  }

  if (data.deliveryDate && typeof data.deliveryDate !== 'string') {
    errors.push('delivery date must be a string if provided');
  }

  if (data.cartId && typeof data.cartId !== 'string') {
    errors.push('cart ID must be a string if provided');
  }

  if (data.orderId && typeof data.orderId !== 'string') {
    errors.push('order ID must be a string if provided');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

async function processOrderMetafields(
  data: ShippingMethodData,
  logger: Logger,
  requestId: string
): Promise<void> {
  try {
    // This would integrate with Shopify Admin API to set order metafields
    // For now, we'll simulate the process
    logger.info('Processing order metafields', {
      requestId,
      orderId: data.orderId,
      shippingMethod: data.shippingMethod,
      deliveryDate: data.deliveryDate
    });

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // In a real implementation, this would:
    // 1. Use Shopify Admin API to set order metafields
    // 2. Set metafields for shipping method and delivery date
    // 3. Handle API errors and retries

    logger.info('Order metafields processed successfully', {
      requestId,
      orderId: data.orderId
    });

  } catch (error: any) {
    logger.error('Error processing order metafields', {
      requestId,
      orderId: data.orderId,
      error: error.message,
      errorStack: error.stack
    });
    // Don't throw here - metafield processing failure shouldn't fail the main operation
  }
}

function getDefaultFeatureFlags(): FeatureFlags {
  return {
    enableShippingOptionChanges: process.env.ENABLE_SHIPPING_OPTION_CHANGES !== 'false',
    enableOrderMetafields: process.env.ENABLE_ORDER_METAFIELDS !== 'false',
    enableLogging: process.env.ENABLE_SHIPPING_METHOD_LOGGING !== 'false'
  };
}

export function getFeatureFlagsFromEnv(): FeatureFlags {
  return {
    enableShippingOptionChanges: process.env.ENABLE_SHIPPING_OPTION_CHANGES === 'true',
    enableOrderMetafields: process.env.ENABLE_ORDER_METAFIELDS === 'true',
    enableLogging: process.env.ENABLE_SHIPPING_METHOD_LOGGING === 'true'
  };
} 