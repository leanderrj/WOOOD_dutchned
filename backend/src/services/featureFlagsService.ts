export interface FeatureFlags {
  // Core functionality flags
  enableMockMode: boolean;
  enableCaching: boolean;
  enableRetryLogic: boolean;
  
  // Configuration flags
  maxRetries: number;
  cacheTimeout: number;
  apiTimeout: number;
  
  // Feature-specific flags
  enableShippingOptionChanges: boolean;
  enableOrderMetafields: boolean;
  enableShippingMethodLogging: boolean;
  enableErrorTracking: boolean;
  enablePerformanceMonitoring: boolean;
  
  // UI/UX flags
  enableAdvancedErrorMessages: boolean;
  enableDebugMode: boolean;
  enableAnalytics: boolean;
  
  // External service flags
  enableExternalErrorReporting: boolean;
  enableMetricsCollection: boolean;
}

export interface FeatureFlagConfig {
  name: keyof FeatureFlags;
  defaultValue: boolean | number;
  description: string;
  category: 'core' | 'performance' | 'ui' | 'external' | 'debug';
  requiresRestart?: boolean;
  validationFn?: (value: any) => boolean;
}

class FeatureFlagsManager {
  private static instance: FeatureFlagsManager;
  private flags: FeatureFlags;
  private configs: FeatureFlagConfig[];

  constructor() {
    this.configs = this.initializeConfigs();
    this.flags = this.loadFlags();
  }

  static getInstance(): FeatureFlagsManager {
    if (!FeatureFlagsManager.instance) {
      FeatureFlagsManager.instance = new FeatureFlagsManager();
    }
    return FeatureFlagsManager.instance;
  }

  private initializeConfigs(): FeatureFlagConfig[] {
    return [
      // Core functionality flags
      {
        name: 'enableMockMode',
        defaultValue: false,
        description: 'Enable mock data instead of external API calls',
        category: 'core'
      },
      {
        name: 'enableCaching',
        defaultValue: true,
        description: 'Enable in-memory caching for API responses',
        category: 'performance'
      },
      {
        name: 'enableRetryLogic',
        defaultValue: true,
        description: 'Enable automatic retry logic for failed requests',
        category: 'core'
      },
      
      // Configuration flags
      {
        name: 'maxRetries',
        defaultValue: 3,
        description: 'Maximum number of retry attempts',
        category: 'performance',
        validationFn: (value) => typeof value === 'number' && value >= 0 && value <= 10
      },
      {
        name: 'cacheTimeout',
        defaultValue: 300000,
        description: 'Cache timeout in milliseconds (5 minutes)',
        category: 'performance',
        validationFn: (value) => typeof value === 'number' && value >= 0
      },
      {
        name: 'apiTimeout',
        defaultValue: 10000,
        description: 'API request timeout in milliseconds',
        category: 'performance',
        validationFn: (value) => typeof value === 'number' && value >= 1000
      },
      
      // Feature-specific flags
      {
        name: 'enableShippingOptionChanges',
        defaultValue: true,
        description: 'Enable shipping method processing and changes',
        category: 'core'
      },
      {
        name: 'enableOrderMetafields',
        defaultValue: true,
        description: 'Enable order metafield processing',
        category: 'core'
      },
      {
        name: 'enableShippingMethodLogging',
        defaultValue: true,
        description: 'Enable detailed logging for shipping method operations',
        category: 'debug'
      },
      {
        name: 'enableErrorTracking',
        defaultValue: true,
        description: 'Enable error tracking and reporting',
        category: 'debug'
      },
      {
        name: 'enablePerformanceMonitoring',
        defaultValue: true,
        description: 'Enable performance monitoring and metrics',
        category: 'performance'
      },
      
      // UI/UX flags
      {
        name: 'enableAdvancedErrorMessages',
        defaultValue: false,
        description: 'Show detailed error messages to users',
        category: 'ui'
      },
      {
        name: 'enableDebugMode',
        defaultValue: false,
        description: 'Enable debug mode with additional logging',
        category: 'debug'
      },
      {
        name: 'enableAnalytics',
        defaultValue: true,
        description: 'Enable analytics and usage tracking',
        category: 'external'
      },
      
      // External service flags
      {
        name: 'enableExternalErrorReporting',
        defaultValue: false,
        description: 'Send errors to external tracking service',
        category: 'external'
      },
      {
        name: 'enableMetricsCollection',
        defaultValue: true,
        description: 'Collect and send metrics to monitoring service',
        category: 'external'
      }
    ];
  }

  private loadFlags(): FeatureFlags {
    const flags = {} as FeatureFlags;

    for (const config of this.configs) {
      const envKey = this.getEnvKey(config.name);
      const envValue = process.env[envKey];
      
      let value: boolean | number;

      if (envValue !== undefined) {
        // Parse environment value
        if (typeof config.defaultValue === 'boolean') {
          value = envValue.toLowerCase() === 'true';
        } else if (typeof config.defaultValue === 'number') {
          const numValue = parseInt(envValue, 10);
          value = isNaN(numValue) ? config.defaultValue : numValue;
        } else {
          value = config.defaultValue;
        }

        // Validate the value
        if (config.validationFn && !config.validationFn(value)) {
          console.warn(`Invalid value for feature flag ${config.name}: ${value}. Using default: ${config.defaultValue}`);
          value = config.defaultValue;
        }
      } else {
        value = config.defaultValue;
      }

      (flags as any)[config.name] = value;
    }

    return flags;
  }

  private getEnvKey(flagName: string): string {
    // Convert camelCase to UPPER_SNAKE_CASE
    return flagName
      .replace(/([A-Z])/g, '_$1')
      .toUpperCase()
      .replace(/^_/, '');
  }

  public getFlags(): FeatureFlags {
    return { ...this.flags };
  }

  public getFlag<T extends keyof FeatureFlags>(name: T): FeatureFlags[T] {
    return this.flags[name];
  }

  public setFlag<T extends keyof FeatureFlags>(name: T, value: FeatureFlags[T]): void {
    const config = this.configs.find(c => c.name === name);
    
    if (config && config.validationFn && !config.validationFn(value)) {
      throw new Error(`Invalid value for feature flag ${name}: ${value}`);
    }

    this.flags[name] = value;
  }

  public isEnabled(name: keyof FeatureFlags): boolean {
    const value = this.flags[name];
    return typeof value === 'boolean' ? value : false;
  }

  public getNumericFlag(name: keyof FeatureFlags): number {
    const value = this.flags[name];
    return typeof value === 'number' ? value : 0;
  }

  public reloadFlags(): void {
    this.flags = this.loadFlags();
  }

  public getFlagInfo(): Array<{
    name: string;
    value: boolean | number;
    config: FeatureFlagConfig;
  }> {
    return this.configs.map(config => ({
      name: config.name,
      value: this.flags[config.name],
      config
    }));
  }

  public getFlagsByCategory(category: FeatureFlagConfig['category']): Partial<FeatureFlags> {
    const result: any = {};
    
    for (const config of this.configs) {
      if (config.category === category) {
        result[config.name] = this.flags[config.name];
      }
    }
    
    return result;
  }

  public validateAllFlags(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const config of this.configs) {
      const value = this.flags[config.name];
      
      if (config.validationFn && !config.validationFn(value)) {
        errors.push(`Invalid value for ${config.name}: ${value}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// Create and export singleton instance
export const featureFlagsManager = FeatureFlagsManager.getInstance();

// Convenience functions
export const getFeatureFlags = (): FeatureFlags => featureFlagsManager.getFlags();
export const isFeatureEnabled = (name: keyof FeatureFlags): boolean => featureFlagsManager.isEnabled(name);
export const getNumericFeatureFlag = (name: keyof FeatureFlags): number => featureFlagsManager.getNumericFlag(name);

// Backwards compatibility with existing shipping method service
export const getFeatureFlagsFromEnv = (): {
  enableShippingOptionChanges: boolean;
  enableOrderMetafields: boolean;
  enableLogging: boolean;
} => {
  const flags = getFeatureFlags();
  return {
    enableShippingOptionChanges: flags.enableShippingOptionChanges,
    enableOrderMetafields: flags.enableOrderMetafields,
    enableLogging: flags.enableShippingMethodLogging
  };
};

// Runtime feature flag checking with fallback
export const withFeatureFlag = <T>(
  flagName: keyof FeatureFlags,
  enabledFn: () => T,
  disabledFn?: () => T
): T => {
  if (isFeatureEnabled(flagName)) {
    return enabledFn();
  } else if (disabledFn) {
    return disabledFn();
  } else {
    throw new Error(`Feature ${flagName} is disabled and no fallback provided`);
  }
};

// Conditional execution based on feature flags
export const ifFeatureEnabled = (flagName: keyof FeatureFlags, fn: () => void): void => {
  if (isFeatureEnabled(flagName)) {
    fn();
  }
}; 