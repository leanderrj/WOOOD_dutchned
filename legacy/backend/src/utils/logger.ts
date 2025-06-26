export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
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

class StructuredLogger implements Logger {
  private minLevel: LogLevel;
  private serviceName: string;
  private version: string;

  constructor(
    minLevel: LogLevel = LogLevel.INFO,
    serviceName: string = 'woood-backend',
    version: string = '1.0.0'
  ) {
    this.minLevel = minLevel;
    this.serviceName = serviceName;
    this.version = version;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    return levels.indexOf(level) >= levels.indexOf(this.minLevel);
  }

  private formatLog(level: LogLevel, message: string, meta?: LogMetadata): string {
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

  debug(message: string, meta?: LogMetadata): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(this.formatLog(LogLevel.DEBUG, message, meta));
    }
  }

  info(message: string, meta?: LogMetadata): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(this.formatLog(LogLevel.INFO, message, meta));
    }
  }

  warn(message: string, meta?: LogMetadata): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatLog(LogLevel.WARN, message, meta));
    }
  }

  error(message: string, meta?: LogMetadata): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatLog(LogLevel.ERROR, message, meta));
    }
  }
}

// Create and export logger instance
const getLogLevel = (): LogLevel => {
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

export const logger = new StructuredLogger(
  getLogLevel(),
  'woood-backend',
  process.env.npm_package_version || '1.0.0'
);

// Error tracking and reporting
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

export class ErrorTracker {
  private static instance: ErrorTracker;

  static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  trackError(error: Error, context: ErrorContext = {}): void {
    const errorData = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      ...context
    };

    logger.error('Application error tracked', errorData);

    // In production, you might want to send this to an external service
    if (process.env.NODE_ENV === 'production' && process.env.ERROR_TRACKING_URL) {
      this.sendToExternalService(errorData).catch(err => {
        logger.warn('Failed to send error to external tracking service', {
          error: err.message,
          originalError: errorData
        });
      });
    }
  }

  private async sendToExternalService(errorData: any): Promise<void> {
    try {
      // Placeholder for external error tracking service integration
      // e.g., Sentry, Rollbar, etc.
      const response = await fetch(process.env.ERROR_TRACKING_URL!, {
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
    } catch (error) {
      // Don't throw here to avoid infinite loops
      console.error('Failed to send error to tracking service:', error);
    }
  }
}

export const errorTracker = ErrorTracker.getInstance();

// Request correlation middleware helper
export const generateRequestId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Performance monitoring helpers
export class PerformanceMonitor {
  private static timers = new Map<string, number>();

  static startTimer(label: string): void {
    this.timers.set(label, Date.now());
  }

  static endTimer(label: string): number {
    const startTime = this.timers.get(label);
    if (!startTime) {
      logger.warn('Timer not found', { label });
      return 0;
    }

    const duration = Date.now() - startTime;
    this.timers.delete(label);

    logger.debug('Performance measurement', {
      label,
      duration,
      unit: 'ms'
    });

    return duration;
  }

  static measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    return new Promise(async (resolve, reject) => {
      this.startTimer(label);
      try {
        const result = await fn();
        const duration = this.endTimer(label);
        logger.info('Async operation completed', {
          operation: label,
          duration,
          success: true
        });
        resolve(result);
      } catch (error) {
        const duration = this.endTimer(label);
        logger.error('Async operation failed', {
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

export const performanceMonitor = PerformanceMonitor; 