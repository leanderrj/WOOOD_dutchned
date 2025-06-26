"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDeliveryDatesFromAPI = fetchDeliveryDatesFromAPI;
async function fetchDeliveryDatesFromAPI(logger) {
    const apiUrl = process.env.DUTCHNED_API_URL;
    const credentials = process.env.DUTCHNED_API_CREDENTIALS;
    const apiTimeout = parseInt(process.env.API_TIMEOUT || '10000');
    const requestStartTime = Date.now();
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, apiTimeout);
    try {
        logger.info('Making request to DutchNed API', {
            url: apiUrl,
            timeout: apiTimeout,
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
    }
    catch (error) {
        clearTimeout(timeoutId);
        const responseTime = Date.now() - requestStartTime;
        if (error.name === 'AbortError') {
            logger.error('DutchNed API request timed out', {
                timeout: apiTimeout,
                responseTime,
                error: 'Request aborted due to timeout'
            });
            throw new Error(`DutchNed API request timed out after ${apiTimeout}ms`);
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
function formatApiResponse(apiData, logger) {
    const dates = [];
    if (!Array.isArray(apiData)) {
        logger.warn('API response is not an array', {
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
            }
            else {
                logger.warn('Invalid date found in API response', {
                    invalidDate: item.date,
                    item
                });
            }
        }
        else {
            logger.warn('Invalid item found in API response', { item });
        }
    }
    logger.info(`Formatted ${dates.length} valid delivery dates from API response`);
    return dates;
}
//# sourceMappingURL=dutchNedClient.js.map