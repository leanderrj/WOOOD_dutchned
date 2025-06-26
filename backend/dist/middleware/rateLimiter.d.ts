import { Request, Response, NextFunction } from 'express';
interface RateLimitConfig {
    windowMs: number;
    maxRequests: number;
    message?: string;
    skipSuccessfulRequests?: boolean;
    skipFailedRequests?: boolean;
}
declare class RateLimiter {
    private clients;
    private config;
    constructor(config: RateLimitConfig);
    private getClientKey;
    private cleanup;
    private shouldSkip;
    middleware(): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
}
export declare const createRateLimiter: (config: RateLimitConfig) => RateLimiter;
export declare const generalRateLimit: RateLimiter;
export declare const apiRateLimit: RateLimiter;
export declare const strictRateLimit: RateLimiter;
export declare const getRateLimitInfo: (rateLimiter: RateLimiter, clientKey: string) => {
    count: any;
    remaining: number;
    resetTime: any;
    resetTimeSeconds: number;
    timeUntilReset: number;
} | null;
export {};
//# sourceMappingURL=rateLimiter.d.ts.map