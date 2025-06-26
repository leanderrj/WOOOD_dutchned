import { DeliveryDate } from '../utils/mockDataGenerator';
interface Logger {
    info: (message: string, meta?: any) => void;
    warn: (message: string, meta?: any) => void;
    error: (message: string, meta?: any) => void;
}
export declare function getDeliveryDates(logger: Logger): Promise<DeliveryDate[]>;
export {};
//# sourceMappingURL=deliveryDatesService.d.ts.map