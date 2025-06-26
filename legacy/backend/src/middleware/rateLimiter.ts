import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  message?: string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

interface ClientInfo {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private clients: Map<string, ClientInfo> = new Map();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = {
      message: 'Too many requests, please try again later.',
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
      ...config
    };

    // Clean up expired entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  private getClientKey(req: Request): string {
    // Use IP address as the client identifier
    return req.ip || 'unknown';
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, info] of this.clients.entries()) {
      if (now > info.resetTime) {
        this.clients.delete(key);
      }
    }
  }

  private shouldSkip(req: Request, res: Response): boolean {
    if (this.config.skipSuccessfulRequests && res.statusCode < 400) {
      return true;
    }
    if (this.config.skipFailedRequests && res.statusCode >= 400) {
      return true;
    }
    return false;
  }

  middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
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
      res.end = function(this: Response, ...args: any[]) {
        if (!this.headersSent && !this.locals.rateLimitSkipped) {
          // Count the request after response is sent
          if (!this.locals.rateLimiter?.shouldSkip(req, this)) {
            clientInfo!.count++;
          }
        }
        return (originalEnd as any)(...args);
      };

      // Store reference for shouldSkip check
      res.locals.rateLimiter = this;

      // Check if limit exceeded
      if (clientInfo.count >= this.config.maxRequests) {
        const resetTime = Math.ceil((clientInfo.resetTime - now) / 1000);
        
        logger.warn('Rate limit exceeded', {
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
export const createRateLimiter = (config: RateLimitConfig) => new RateLimiter(config);

// Default rate limiters
export const generalRateLimit = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // 100 requests per 15 minutes
  message: 'Too many requests from this IP, please try again later.'
});

export const apiRateLimit = createRateLimiter({
  windowMs: 1 * 60 * 1000, // 1 minute
  maxRequests: 20, // 20 requests per minute
  message: 'API rate limit exceeded, please slow down.'
});

export const strictRateLimit = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 requests per 15 minutes
  message: 'Too many requests, please try again later.'
});

// Helper function to get rate limit info
export const getRateLimitInfo = (rateLimiter: RateLimiter, clientKey: string) => {
  const clientInfo = (rateLimiter as any).clients.get(clientKey);
  if (!clientInfo) {
    return null;
  }

  const now = Date.now();
  return {
    count: clientInfo.count,
    remaining: Math.max(0, (rateLimiter as any).config.maxRequests - clientInfo.count),
    resetTime: clientInfo.resetTime,
    resetTimeSeconds: Math.ceil(clientInfo.resetTime / 1000),
    timeUntilReset: Math.max(0, clientInfo.resetTime - now)
  };
}; 