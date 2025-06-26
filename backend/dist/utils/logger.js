"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performanceMonitor = exports.PerformanceMonitor = exports.generateRequestId = exports.errorTracker = exports.ErrorTracker = exports.logger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "debug";
    LogLevel["INFO"] = "info";
    LogLevel["WARN"] = "warn";
    LogLevel["ERROR"] = "error";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class StructuredLogger {
    constructor(minLevel = LogLevel.INFO, serviceName = 'woood-backend', version = '1.0.0') {
        this.minLevel = minLevel;
        this.serviceName = serviceName;
        this.version = version;
    }
    shouldLog(level) {
        const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
        return levels.indexOf(level) >= levels.indexOf(this.minLevel);
    }
    formatLog(level, message, meta) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            level: level.toUpperCase(),
            service: this.serviceName,
            version: this.version,
            message,
            ...meta,
            environment: process.env.NODE_ENV || 'development'
        };
        return JSON.stringify(logEntry);
    }
    debug(message, meta) {
        if (this.shouldLog(LogLevel.DEBUG)) {
            console.debug(this.formatLog(LogLevel.DEBUG, message, meta));
        }
    }
    info(message, meta) {
        if (this.shouldLog(LogLevel.INFO)) {
            console.log(this.formatLog(LogLevel.INFO, message, meta));
        }
    }
    warn(message, meta) {
        if (this.shouldLog(LogLevel.WARN)) {
            console.warn(this.formatLog(LogLevel.WARN, message, meta));
        }
    }
    error(message, meta) {
        if (this.shouldLog(LogLevel.ERROR)) {
            console.error(this.formatLog(LogLevel.ERROR, message, meta));
        }
    }
}
// Create and export logger instance
const getLogLevel = () => {
    const level = process.env.LOG_LEVEL?.toLowerCase();
    switch (level) {
        case 'debug':
            return LogLevel.DEBUG;
        case 'info':
            return LogLevel.INFO;
        case 'warn':
            return LogLevel.WARN;
        case 'error':
            return LogLevel.ERROR;
        default:
            return process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG;
    }
};
exports.logger = new StructuredLogger(getLogLevel(), 'woood-backend', process.env.npm_package_version || '1.0.0');
class ErrorTracker {
    static getInstance() {
        if (!ErrorTracker.instance) {
            ErrorTracker.instance = new ErrorTracker();
        }
        return ErrorTracker.instance;
    }
    trackError(error, context = {}) {
        const errorData = {
            name: error.name,
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            ...context
        };
        exports.logger.error('Application error tracked', errorData);
        // In production, you might want to send this to an external service
        if (process.env.NODE_ENV === 'production' && process.env.ERROR_TRACKING_URL) {
            this.sendToExternalService(errorData).catch(err => {
                exports.logger.warn('Failed to send error to external tracking service', {
                    error: err.message,
                    originalError: errorData
                });
            });
        }
    }
    async sendToExternalService(errorData) {
        try {
            // Placeholder for external error tracking service integration
            // e.g., Sentry, Rollbar, etc.
            const response = await fetch(process.env.ERROR_TRACKING_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.ERROR_TRACKING_API_KEY}`
                },
                body: JSON.stringify(errorData)
            });
            if (!response.ok) {
                throw new Error(`Error tracking service responded with ${response.status}`);
            }
        }
        catch (error) {
            // Don't throw here to avoid infinite loops
            console.error('Failed to send error to tracking service:', error);
        }
    }
}
exports.ErrorTracker = ErrorTracker;
exports.errorTracker = ErrorTracker.getInstance();
// Request correlation middleware helper
const generateRequestId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};
exports.generateRequestId = generateRequestId;
// Performance monitoring helpers
class PerformanceMonitor {
    static startTimer(label) {
        this.timers.set(label, Date.now());
    }
    static endTimer(label) {
        const startTime = this.timers.get(label);
        if (!startTime) {
            exports.logger.warn('Timer not found', { label });
            return 0;
        }
        const duration = Date.now() - startTime;
        this.timers.delete(label);
        exports.logger.debug('Performance measurement', {
            label,
            duration,
            unit: 'ms'
        });
        return duration;
    }
    static measureAsync(label, fn) {
        return new Promise(async (resolve, reject) => {
            this.startTimer(label);
            try {
                const result = await fn();
                const duration = this.endTimer(label);
                exports.logger.info('Async operation completed', {
                    operation: label,
                    duration,
                    success: true
                });
                resolve(result);
            }
            catch (error) {
                const duration = this.endTimer(label);
                exports.logger.error('Async operation failed', {
                    operation: label,
                    duration,
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
                reject(error);
            }
        });
    }
}
exports.PerformanceMonitor = PerformanceMonitor;
PerformanceMonitor.timers = new Map();
exports.performanceMonitor = PerformanceMonitor;
//# sourceMappingURL=logger.js.map