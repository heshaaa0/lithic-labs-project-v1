import { PricingMode } from '../enums/booking.enum';

const MS_PER_HOUR = 60 * 60 * 1000;
const MS_PER_DAY = 24 * MS_PER_HOUR;

export function calculateBookingTotalAmount(
  pickup: Date,
  returnDate: Date,
  pricingMode: PricingMode,
  hourlyRate: number,
  dailyRate: number,
): number {
  const durationMs = returnDate.getTime() - pickup.getTime();

  if (pricingMode === PricingMode.HOURLY) {
    const hours = durationMs / MS_PER_HOUR;
    const billedHours = Math.ceil(hours);
    const hourlyTotal = billedHours * hourlyRate;
    return Math.min(hourlyTotal, dailyRate);
  }

  const days = Math.ceil(durationMs / MS_PER_DAY);
  return days * dailyRate;
}
