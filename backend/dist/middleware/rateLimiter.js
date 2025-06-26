"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRateLimitInfo = exports.strictRateLimit = exports.apiRateLimit = exports.generalRateLimit = exports.createRateLimiter = void 0;
const logger_1 = require("../utils/logger");
class RateLimiter {
    constructor(config) {
        this.clients = new Map();
        this.config = {
            message: 'Too many requests, please try again later.',
            skipSuccessfulRequests: false,
            skipFailedRequests: false,
            ...config
        };
        // Clean up expired entries every minute
        setInterval(() => this.cleanup(), 60000);
    }
    getClientKey(req) {
        // Use IP address as the client identifier
        return req.ip || 'unknown';
    }
    cleanup() {
        const now = Date.now();
        for (const [key, info] of this.clients.entries()) {
            if (now > info.resetTime) {
                this.clients.delete(key);
            }
        }
    }
    shouldSkip(req, res) {
        if (this.config.skipSuccessfulRequests && res.statusCode < 400) {
            return true;
        }
        if (this.config.skipFailedRequests && res.statusCode >= 400) {
            return true;
        }
        return false;
    }
    middleware() {
        return (req, res, next) => {
            const clientKey = this.getClientKey(req);
            const now = Date.now();
            // Get or create client info
            let clientInfo = this.clients.get(clientKey);
            if (!clientInfo || now > clientInfo.resetTime) {
                clientInfo = {
                    count: 0,
                    resetTime: now + this.config.windowMs
                };
                this.clients.set(clientKey, clientInfo);
            }
            // Check if request should be counted
            const originalEnd = res.end.bind(res);
            res.end = function (...args) {
                if (!this.headersSent && !this.locals.rateLimitSkipped) {
                    // Count the request after response is sent
                    if (!this.locals.rateLimiter?.shouldSkip(req, this)) {
                        clientInfo.count++;
                    }
                }
                return originalEnd(...args);
            };
            // Store reference for shouldSkip check
            res.locals.rateLimiter = this;
            // Check if limit exceeded
            if (clientInfo.count >= this.config.maxRequests) {
                const resetTime = Math.ceil((clientInfo.resetTime - now) / 1000);
                logger_1.logger.warn('Rate limit exceeded', {
                    clientKey,
                    count: clientInfo.count,
                    limit: this.config.maxRequests,
                    resetTime,
                    endpoint: req.path,
                    method: req.method,
                    userAgent: req.get('User-Agent')
                });
                res.set({
                    'X-RateLimit-Limit': this.config.maxRequests.toString(),
                    'X-RateLimit-Remaining': '0',
                    'X-RateLimit-Reset': Math.ceil(clientInfo.resetTime / 1000).toString(),
                    'Retry-After': resetTime.toString()
                });
                return res.status(429).json({
                    error: 'Too Many Requests',
                    message: this.config.message,
                    retryAfter: resetTime,
                    timestamp: new Date().toISOString()
                });
            }
            // Set rate limit headers
            const remaining = Math.max(0, this.config.maxRequests - clientInfo.count - 1);
            res.set({
                'X-RateLimit-Limit': this.config.maxRequests.toString(),
                'X-RateLimit-Remaining': remaining.toString(),
                'X-RateLimit-Reset': Math.ceil(clientInfo.resetTime / 1000).toString()
            });
            next();
        };
    }
}
// Create rate limiters for different endpoints
const createRateLimiter = (config) => new RateLimiter(config);
exports.createRateLimiter = createRateLimiter;
// Default rate limiters
exports.generalRateLimit = (0, exports.createRateLimiter)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // 100 requests per 15 minutes
    message: 'Too many requests from this IP, please try again later.'
});
exports.apiRateLimit = (0, exports.createRateLimiter)({
    windowMs: 1 * 60 * 1000, // 1 minute
    maxRequests: 20, // 20 requests per minute
    message: 'API rate limit exceeded, please slow down.'
});
exports.strictRateLimit = (0, exports.createRateLimiter)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 requests per 15 minutes
    message: 'Too many requests, please try again later.'
});
// Helper function to get rate limit info
const getRateLimitInfo = (rateLimiter, clientKey) => {
    const clientInfo = rateLimiter.clients.get(clientKey);
    if (!clientInfo) {
        return null;
    }
    const now = Date.now();
    return {
        count: clientInfo.count,
        remaining: Math.max(0, rateLimiter.config.maxRequests - clientInfo.count),
        resetTime: clientInfo.resetTime,
        resetTimeSeconds: Math.ceil(clientInfo.resetTime / 1000),
        timeUntilReset: Math.max(0, clientInfo.resetTime - now)
    };
};
exports.getRateLimitInfo = getRateLimitInfo;
//# sourceMappingURL=rateLimiter.js.map