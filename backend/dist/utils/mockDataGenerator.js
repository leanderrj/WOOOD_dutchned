"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMockDeliveryDates = generateMockDeliveryDates;
function generateMockDeliveryDates() {
    const dates = [];
    const today = new Date();
    // Generate mock dates for the next 14 weekdays, excluding weekends
    for (let i = 1; i <= 20; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        // Skip weekends (Saturday = 6, Sunday = 0)
        const dayOfWeek = futureDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            continue;
        }
        const dateString = futureDate.toISOString().split('T')[0]; // YYYY-MM-DD format
        const displayName = futureDate.toLocaleDateString('nl-NL', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });
        dates.push({
            date: dateString,
            displayName
        });
        // Stop when we have 14 weekdays
        if (dates.length >= 14) {
            break;
        }
    }
    return dates;
}
//# sourceMappingURL=mockDataGenerator.js.map