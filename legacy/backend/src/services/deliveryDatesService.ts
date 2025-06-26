import { DeliveryDate, generateMockDeliveryDates } from '../utils/mockDataGenerator';
import { fetchDeliveryDatesFromAPI } from '../api/dutchNedClient';

interface CacheEntry {
  data: DeliveryDate[];
  timestamp: number;
}

interface Logger {
  info: (message: string, meta?: any) => void;
  warn: (message: string, meta?: any) => void;
  error: (message: string, meta?: any) => void;
}

// In-memory cache for delivery dates
const deliveryCache = new Map<string, CacheEntry>();
const CACHE_KEY = 'delivery-dates';

export async function getDeliveryDates(logger: Logger): Promise<DeliveryDate[]> {
  const startTime = Date.now();
  const cacheDuration = parseInt(process.env.CACHE_DURATION || '300000'); // 5 minutes default
  const useMockData = process.env.USE_MOCK_DELIVERY_DATES === 'true';

  logger.info('Starting getDeliveryDates service', { timestamp: startTime });

  // Check if mock data should be used
  if (useMockData) {
    logger.info('Using mock delivery dates (USE_MOCK_DELIVERY_DATES=true)');
    const mockData = generateMockDeliveryDates();
    logger.info(`Generated ${mockData.length} mock delivery dates`, { 
      executionTime: Date.now() - startTime 
    });
    return mockData;
  }

  // Check cache first
  const cached = deliveryCache.get(CACHE_KEY);
  if (cached && (Date.now() - cached.timestamp) < cacheDuration) {
    logger.info('Returning cached delivery dates', { 
      cacheAge: Date.now() - cached.timestamp,
      executionTime: Date.now() - startTime
    });
    return cached.data;
  }

  try {
    // Attempt to fetch from external API with retry logic
    const deliveryDates = await fetchDeliveryDatesWithRetry(logger);

    // Cache the successful result
    deliveryCache.set(CACHE_KEY, {
      data: deliveryDates,
      timestamp: Date.now()
    });

    logger.info('Successfully fetched and cached delivery dates', {
      count: deliveryDates.length,
      executionTime: Date.now() - startTime
    });

    return deliveryDates;
  } catch (error: any) {
    const executionTime = Date.now() - startTime;
    logger.error('All attempts to fetch delivery dates failed, falling back to mock data', {
      error: error.message,
      errorStack: error.stack,
      executionTime,
      fallbackUsed: true
    });

    // Fallback to mock data when API consistently fails
    const mockData = generateMockDeliveryDates();
    logger.info(`Returning ${mockData.length} fallback mock delivery dates`, {
      executionTime
    });

    return mockData;
  }
}

async function fetchDeliveryDatesWithRetry(logger: Logger): Promise<DeliveryDate[]> {
  const maxRetries = parseInt(process.env.MAX_RETRIES || '3');
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const attemptStartTime = Date.now();
    
    try {
      logger.info(`Attempting to fetch delivery dates (attempt ${attempt}/${maxRetries})`, {
        attempt,
        timestamp: attemptStartTime
      });

      const deliveryDates = await fetchDeliveryDatesFromAPI(logger);
      
      logger.info(`Successfully fetched delivery dates on attempt ${attempt}`, {
        attempt,
        count: deliveryDates.length,
        responseTime: Date.now() - attemptStartTime
      });

      return deliveryDates;
    } catch (error: any) {
      lastError = error;
      const responseTime = Date.now() - attemptStartTime;
      
      logger.warn(`Attempt ${attempt} failed to fetch delivery dates`, {
        attempt,
        error: error.message,
        responseTime,
        willRetry: attempt < maxRetries
      });

      // Don't wait after the last attempt
      if (attempt < maxRetries) {
        // Exponential backoff: 1s, 2s, 4s
        const waitTime = Math.pow(2, attempt - 1) * 1000;
        logger.info(`Waiting ${waitTime}ms before retry`, { waitTime, nextAttempt: attempt + 1 });
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError || new Error('All retry attempts failed');
} 