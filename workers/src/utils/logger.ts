import { Env, WorkerConfig } from '../types/env';
import { LogEntry } from '../types/common';

/**
 * Simple logger for Cloudflare Workers
 * Provides structured logging with optional external service integration
 */
export class WorkersLogger {
  constructor(
    private env: Env,
    private config: WorkerConfig
  ) {}

  /**
   * Log info level message
   */
  info(message: string, metadata?: Record<string, any>): void {
    if (!this.config.features.enableRequestLogging) {
      return;
    }

    const logEntry = this.createLogEntry('info', message, metadata);
    console.log(JSON.stringify(logEntry));

    // Send to external logging service if configured
    if (this.config.endpoints.logging) {
      this.sendToExternalService(logEntry);
    }
  }

  /**
   * Log warning level message
   */
  warn(message: string, metadata?: Record<string, any>): void {
    const logEntry = this.createLogEntry('warn', message, metadata);
    console.warn(JSON.stringify(logEntry));

    // Send to external logging service if configured
    if (this.config.endpoints.logging) {
      this.sendToExternalService(logEntry);
    }
  }

  /**
   * Log error level message
   */
  error(message: string, metadata?: Record<string, any>): void {
    const logEntry = this.createLogEntry('error', message, metadata);
    console.error(JSON.stringify(logEntry));

    // Always send errors to external service if configured
    if (this.config.endpoints.errorTracking || this.config.endpoints.logging) {
      this.sendToExternalService(logEntry);
    }
  }

  /**
   * Log debug level message
   */
  debug(message: string, metadata?: Record<string, any>): void {
    if (!this.config.features.enableDebugLogging) {
      return;
    }

    const logEntry = this.createLogEntry('debug', message, metadata);
    console.debug(JSON.stringify(logEntry));

    // Send to external logging service if configured and debug logging is enabled
    if (this.config.endpoints.logging) {
      this.sendToExternalService(logEntry);
    }
  }

  /**
   * Create structured log entry
   */
  private createLogEntry(
    level: 'debug' | 'info' | 'warn' | 'error',
    message: string,
    metadata?: Record<string, any>
  ): LogEntry {
    return {
      level,
      message,
      metadata: metadata || {},
      timestamp: new Date().toISOString(),
      worker: 'delivery-api',
      requestId: metadata?.requestId,
      errorId: metadata?.errorId
    };
  }

  /**
   * Send log entry to external service
   * Non-blocking - errors are silently ignored
   */
  private sendToExternalService(logEntry: LogEntry): void {
    // Use setTimeout to make this non-blocking
    setTimeout(async () => {
      try {
        const endpoint = logEntry.level === 'error' 
          ? (this.config.endpoints.errorTracking || this.config.endpoints.logging)
          : this.config.endpoints.logging;

        if (!endpoint) {
          return;
        }

        await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'WOOOD-Delivery-API/1.0 (Cloudflare Workers)'
          },
          body: JSON.stringify({
            service: 'woood-delivery-api',
            environment: this.config.environment,
            ...logEntry
          })
        });
      } catch (error) {
        // Silently ignore external logging failures
        // We don't want logging to break the main functionality
      }
    }, 0);
  }
} 