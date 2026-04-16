import { PricingMode } from '../enums/booking.enum';
import type { VehicleModel } from './vehicle.model';

export class BookingModel {
  id: number;
  vehicleId: number;
  pickupDateTime: Date;
  returnDateTime: Date;
  pricingMode: PricingMode;
  totalAmount: number;
  createdAt: Date;
  vehicle?: VehicleModel;
}
