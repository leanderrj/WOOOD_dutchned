export interface FeatureFlags {
    enableMockMode: boolean;
    enableCaching: boolean;
    enableRetryLogic: boolean;
    maxRetries: number;
    cacheTimeout: number;
    apiTimeout: number;
    enableShippingOptionChanges: boolean;
    enableOrderMetafields: boolean;
    enableShippingMethodLogging: boolean;
    enableErrorTracking: boolean;
    enablePerformanceMonitoring: boolean;
    enableAdvancedErrorMessages: boolean;
    enableDebugMode: boolean;
    enableAnalytics: boolean;
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
declare class FeatureFlagsManager {
    private static instance;
    private flags;
    private configs;
    constructor();
    static getInstance(): FeatureFlagsManager;
    private initializeConfigs;
    private loadFlags;
    private getEnvKey;
    getFlags(): FeatureFlags;
    getFlag<T extends keyof FeatureFlags>(name: T): FeatureFlags[T];
    setFlag<T extends keyof FeatureFlags>(name: T, value: FeatureFlags[T]): void;
    isEnabled(name: keyof FeatureFlags): boolean;
    getNumericFlag(name: keyof FeatureFlags): number;
    reloadFlags(): void;
    getFlagInfo(): Array<{
        name: string;
        value: boolean | number;
        config: FeatureFlagConfig;
    }>;
    getFlagsByCategory(category: FeatureFlagConfig['category']): Partial<FeatureFlags>;
    validateAllFlags(): {
        valid: boolean;
        errors: string[];
    };
}
export declare const featureFlagsManager: FeatureFlagsManager;
export declare const getFeatureFlags: () => FeatureFlags;
export declare const isFeatureEnabled: (name: keyof FeatureFlags) => boolean;
export declare const getNumericFeatureFlag: (name: keyof FeatureFlags) => number;
export declare const getFeatureFlagsFromEnv: () => {
    enableShippingOptionChanges: boolean;
    enableOrderMetafields: boolean;
    enableLogging: boolean;
};
export declare const withFeatureFlag: <T>(flagName: keyof FeatureFlags, enabledFn: () => T, disabledFn?: () => T) => T;
export declare const ifFeatureEnabled: (flagName: keyof FeatureFlags, fn: () => void) => void;
export {};
//# sourceMappingURL=featureFlagsService.d.ts.map