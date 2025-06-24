import { ActionOptions } from "gadget-server";

// In-memory cache for delivery dates (in production, consider using Redis or similar)
const deliveryCache = new Map<string, { data: any; timestamp: number; }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const API_TIMEOUT = 10 * 1000; // 10 seconds
const MAX_RETRIES = 3;

interface DeliveryDate {
  date: string;
  displayName: string;
}

export const run: ActionRun = async ({ params, logger, api, connections, config }) => {
  const startTime = Date.now();
  const cacheKey = 'delivery-dates';

  logger.info('Starting getDeliveryDates action', { timestamp: startTime });

  // Check if mock data should be used
  if (config.USE_MOCK_DELIVERY_DATES === 'true') {
    logger.info('Using mock delivery dates (USE_MOCK_DELIVERY_DATES=true)');
    const mockData = generateMockDeliveryDates();
    logger.info(`Generated ${mockData.length} mock delivery dates`, { 
      executionTime: Date.now() - startTime 
    });
    return mockData;
  }

  // Check cache first
  const cached = deliveryCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
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
    deliveryCache.set(cacheKey, {
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
};

async function fetchDeliveryDatesWithRetry(logger: any): Promise<DeliveryDate[]> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const attemptStartTime = Date.now();
    
    try {
      logger.info(`Attempting to fetch delivery dates (attempt ${attempt}/${MAX_RETRIES})`, {
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
        willRetry: attempt < MAX_RETRIES
      });

      // Don't wait after the last attempt
      if (attempt < MAX_RETRIES) {
        // Exponential backoff: 1s, 2s, 4s
        const waitTime = Math.pow(2, attempt - 1) * 1000;
        logger.info(`Waiting ${waitTime}ms before retry`, { waitTime, nextAttempt: attempt + 1 });
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError || new Error('All retry attempts failed');
}

async function fetchDeliveryDatesFromAPI(logger: any): Promise<DeliveryDate[]> {
  const apiUrl = 'https://eekhoorn-connector.dutchned.com/api/delivery-dates/available';
  const credentials = 'YmFzaWM6YmwyMzFBU1hDMDk1M0pL';
  const requestStartTime = Date.now();

  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, API_TIMEOUT);

  try {
    logger.info('Making request to DutchNed API', {
      url: apiUrl,
      timeout: API_TIMEOUT,
      timestamp: requestStartTime
    });

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const responseTime = Date.now() - requestStartTime;

    logger.info('Received response from DutchNed API', {
      status: response.status,
      statusText: response.statusText,
      responseTime,
      ok: response.ok
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error('DutchNed API request failed with non-OK status', {
        status: response.status,
        statusText: response.statusText,
        responseTime,
        errorBody: errorText
      });
      throw new Error(`DutchNed API request failed with status: ${response.status} ${response.statusText}`);
    }

    const apiData = await response.json();
    logger.info('Successfully parsed DutchNed API response', {
      responseTime,
      dataType: Array.isArray(apiData) ? 'array' : typeof apiData,
      dataLength: Array.isArray(apiData) ? apiData.length : 'N/A'
    });

    return formatApiResponse(apiData, logger);
  } catch (error: any) {
    clearTimeout(timeoutId);
    const responseTime = Date.now() - requestStartTime;

    if (error.name === 'AbortError') {
      logger.error('DutchNed API request timed out', {
        timeout: API_TIMEOUT,
        responseTime,
        error: 'Request aborted due to timeout'
      });
      throw new Error(`DutchNed API request timed out after ${API_TIMEOUT}ms`);
    }

    logger.error('DutchNed API request failed with error', {
      error: error.message,
      errorName: error.name,
      errorStack: error.stack,
      responseTime
    });

    throw error;
  }
}

function formatApiResponse(apiData: any, logger?: any): DeliveryDate[] {
  const dates: DeliveryDate[] = [];

  if (!Array.isArray(apiData)) {
    logger?.warn('API response is not an array', {
      dataType: typeof apiData,
      data: apiData
    });
    return dates;
  }

  for (const item of apiData) {
    if (item && item.date) {
      const date = new Date(item.date);
      if (!isNaN(date.getTime())) {
        dates.push({
          date: item.date, // Already in YYYY-MM-DD format
          displayName: date.toLocaleDateString('nl-NL', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
          }),
        });
      } else {
        logger?.warn('Invalid date found in API response', {
          invalidDate: item.date,
          item
        });
      }
    } else {
      logger?.warn('Invalid item found in API response', { item });
    }
  }

  logger?.info(`Formatted ${dates.length} valid delivery dates from API response`);
  return dates;
}

function generateMockDeliveryDates(): DeliveryDate[] {
  const dates: DeliveryDate[] = [];
  const today = new Date();
  
  // Generate mock dates for the next 14 days, excluding weekends
  for (let i = 1; i <= 20; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i);
    
    // Skip weekends (Saturday = 6, Sunday = 0)
    const dayOfWeek = futureDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      continue;
    }

    const dateString = futureDate.toISOString().split('T')[0]; // YYYY-MM-DD format
    const displayName = futureDate.toLocaleDateString('nl-NL', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });

    dates.push({
      date: dateString,
      displayName
    });

    // Stop when we have 14 weekdays
    if (dates.length >= 14) {
      break;
    }
  }

  return dates;
}

export const params = {};

export const options: ActionOptions = {
  triggers: { api: true }
};
