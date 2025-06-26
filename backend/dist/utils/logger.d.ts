export declare enum LogLevel {
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error"
}
export interface LogMetadata {
    [key: string]: any;
    requestId?: string;
    userId?: string;
    sessionId?: string;
    timestamp?: string;
    duration?: number;
    statusCode?: number;
    userAgent?: string;
    ip?: string;
    endpoint?: string;
    method?: string;
}
export interface Logger {
    debug: (message: string, meta?: LogMetadata) => void;
    info: (message: string, meta?: LogMetadata) => void;
    warn: (message: string, meta?: LogMetadata) => void;
    error: (message: string, meta?: LogMetadata) => void;
}
declare class StructuredLogger implements Logger {
    private minLevel;
    private serviceName;
    private version;
    constructor(minLevel?: LogLevel, serviceName?: string, version?: string);
    private shouldLog;
    private formatLog;
    debug(message: string, meta?: LogMetadata): void;
    info(message: string, meta?: LogMetadata): void;
    warn(message: string, meta?: LogMetadata): void;
    error(message: string, meta?: LogMetadata): void;
}
export declare const logger: StructuredLogger;
export interface ErrorContext {
    requestId?: string;
    userId?: string;
    endpoint?: string;
    method?: string;
    statusCode?: number;
    userAgent?: string;
    ip?: string;
    stack?: string;
    additionalData?: any;
}
export declare class ErrorTracker {
    private static instance;
    static getInstance(): ErrorTracker;
    trackError(error: Error, context?: ErrorContext): void;
    private sendToExternalService;
}
export declare const errorTracker: ErrorTracker;
export declare const generateRequestId: () => string;
export declare class PerformanceMonitor {
    private static timers;
    static startTimer(label: string): void;
    static endTimer(label: string): number;
    static measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T>;
}
export declare const performanceMonitor: typeof PerformanceMonitor;
export {};
//# sourceMappingURL=logger.d.ts.map