import { ActionOptions } from "gadget-server";

// In-memory cache for delivery dates (in production, consider using Redis or similar)
const deliveryCache = new Map<string, { data: any; timestamp: number; }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export const run: ActionRun = async ({ params, logger, api, connections }) => {
  // Create static cache key
  const cacheKey = 'delivery-dates';

  // Check cache first
  const cached = deliveryCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    logger.info(`Returning cached delivery dates for ${cacheKey}`);
    return cached.data;
  }

  try {
    // Attempt to fetch from external API (DutchNed or similar)
    const deliveryDates = await fetchDeliveryDatesFromAPI(logger);

    // Cache the result
    deliveryCache.set(cacheKey, {
      data: deliveryDates,
      timestamp: Date.now()
    });

    logger.info(`Successfully fetched delivery dates for ${cacheKey}`);
    return deliveryDates;
  } catch (error: any) {
    logger.error(`Failed to fetch delivery dates from API: ${error.message}`);
    // Return empty array when API fails
    return [];
  }
};

async function fetchDeliveryDatesFromAPI(logger?: any) {
  // Real DutchNed API call
  const apiUrl = `https://eekhoorn-connector.dutchned.com/api/delivery-dates/available`;

  // Encode credentials for Basic authentication
  const credentials = 'YmFzaWM6YmwyMzFBU1hDMDk1M0pL';

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    logger?.error(`DutchNed API request failed with status: ${response.status}, body: ${errorText}`);
    throw new Error(`DutchNed API request failed with status: ${response.status}`);
  }

  const apiData = await response.json();
  logger?.info(`DutchNed API response received: ${JSON.stringify(apiData)}`);

  // Parse and format the API response
  return formatApiResponse(apiData);
}

function formatApiResponse(apiData: any) {
  // Format DutchNed API response into standardized date array
  // DutchNed response format: Array of objects with {date: "YYYY-MM-DD", note: null}
  const dates = [];

  if (Array.isArray(apiData)) {
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
        }
      }
    }
  }

  return dates;
}



export const params = {};

export const options: ActionOptions = {
  triggers: { api: true }
};
