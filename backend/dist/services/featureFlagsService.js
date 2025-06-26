"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ifFeatureEnabled = exports.withFeatureFlag = exports.getFeatureFlagsFromEnv = exports.getNumericFeatureFlag = exports.isFeatureEnabled = exports.getFeatureFlags = exports.featureFlagsManager = void 0;
class FeatureFlagsManager {
    constructor() {
        this.configs = this.initializeConfigs();
        this.flags = this.loadFlags();
    }
    static getInstance() {
        if (!FeatureFlagsManager.instance) {
            FeatureFlagsManager.instance = new FeatureFlagsManager();
        }
        return FeatureFlagsManager.instance;
    }
    initializeConfigs() {
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
    loadFlags() {
        const flags = {};
        for (const config of this.configs) {
            const envKey = this.getEnvKey(config.name);
            const envValue = process.env[envKey];
            let value;
            if (envValue !== undefined) {
                // Parse environment value
                if (typeof config.defaultValue === 'boolean') {
                    value = envValue.toLowerCase() === 'true';
                }
                else if (typeof config.defaultValue === 'number') {
                    const numValue = parseInt(envValue, 10);
                    value = isNaN(numValue) ? config.defaultValue : numValue;
                }
                else {
                    value = config.defaultValue;
                }
                // Validate the value
                if (config.validationFn && !config.validationFn(value)) {
                    console.warn(`Invalid value for feature flag ${config.name}: ${value}. Using default: ${config.defaultValue}`);
                    value = config.defaultValue;
                }
            }
            else {
                value = config.defaultValue;
            }
            flags[config.name] = value;
        }
        return flags;
    }
    getEnvKey(flagName) {
        // Convert camelCase to UPPER_SNAKE_CASE
        return flagName
            .replace(/([A-Z])/g, '_$1')
            .toUpperCase()
            .replace(/^_/, '');
    }
    getFlags() {
        return { ...this.flags };
    }
    getFlag(name) {
        return this.flags[name];
    }
    setFlag(name, value) {
        const config = this.configs.find(c => c.name === name);
        if (config && config.validationFn && !config.validationFn(value)) {
            throw new Error(`Invalid value for feature flag ${name}: ${value}`);
        }
        this.flags[name] = value;
    }
    isEnabled(name) {
        const value = this.flags[name];
        return typeof value === 'boolean' ? value : false;
    }
    getNumericFlag(name) {
        const value = this.flags[name];
        return typeof value === 'number' ? value : 0;
    }
    reloadFlags() {
        this.flags = this.loadFlags();
    }
    getFlagInfo() {
        return this.configs.map(config => ({
            name: config.name,
            value: this.flags[config.name],
            config
        }));
    }
    getFlagsByCategory(category) {
        const result = {};
        for (const config of this.configs) {
            if (config.category === category) {
                result[config.name] = this.flags[config.name];
            }
        }
        return result;
    }
    validateAllFlags() {
        const errors = [];
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
exports.featureFlagsManager = FeatureFlagsManager.getInstance();
// Convenience functions
const getFeatureFlags = () => exports.featureFlagsManager.getFlags();
exports.getFeatureFlags = getFeatureFlags;
const isFeatureEnabled = (name) => exports.featureFlagsManager.isEnabled(name);
exports.isFeatureEnabled = isFeatureEnabled;
const getNumericFeatureFlag = (name) => exports.featureFlagsManager.getNumericFlag(name);
exports.getNumericFeatureFlag = getNumericFeatureFlag;
// Backwards compatibility with existing shipping method service
const getFeatureFlagsFromEnv = () => {
    const flags = (0, exports.getFeatureFlags)();
    return {
        enableShippingOptionChanges: flags.enableShippingOptionChanges,
        enableOrderMetafields: flags.enableOrderMetafields,
        enableLogging: flags.enableShippingMethodLogging
    };
};
exports.getFeatureFlagsFromEnv = getFeatureFlagsFromEnv;
// Runtime feature flag checking with fallback
const withFeatureFlag = (flagName, enabledFn, disabledFn) => {
    if ((0, exports.isFeatureEnabled)(flagName)) {
        return enabledFn();
    }
    else if (disabledFn) {
        return disabledFn();
    }
    else {
        throw new Error(`Feature ${flagName} is disabled and no fallback provided`);
    }
};
exports.withFeatureFlag = withFeatureFlag;
// Conditional execution based on feature flags
const ifFeatureEnabled = (flagName, fn) => {
    if ((0, exports.isFeatureEnabled)(flagName)) {
        fn();
    }
};
exports.ifFeatureEnabled = ifFeatureEnabled;
//# sourceMappingURL=featureFlagsService.js.map