export interface ShippingMethodData {
    shippingMethod: string;
    deliveryDate?: string;
    timestamp: string;
    cartId?: string;
    orderId?: string;
}
export interface ShippingMethodProcessResult {
    success: boolean;
    message: string;
    data?: {
        shippingMethod: string;
        deliveryDate?: string;
        timestamp: string;
    };
    error?: string;
}
interface Logger {
    info: (message: string, meta?: any) => void;
    warn: (message: string, meta?: any) => void;
    error: (message: string, meta?: any) => void;
}
interface FeatureFlags {
    enableShippingOptionChanges: boolean;
    enableOrderMetafields: boolean;
    enableLogging: boolean;
}
export declare function processShippingMethodSelection(data: ShippingMethodData, logger: Logger, featureFlags?: FeatureFlags): Promise<ShippingMethodProcessResult>;
export declare function getShippingMethodData(identifier: string, logger: Logger): Promise<ShippingMethodData | null>;
export declare function getFeatureFlagsFromEnv(): FeatureFlags;
export {};
//# sourceMappingURL=shippingMethodService.d.ts.map