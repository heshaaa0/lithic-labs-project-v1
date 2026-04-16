import { VehicleStatus } from '../enums/vehicle.enum';
import { BookingModel } from './booking.model';

export class VehicleModel {
  id: number;
  title: string;
  hourlyRate: number;
  dailyRate: number;
  status: VehicleStatus;
  createdAt: Date;
  updatedAt: Date;
  bookings?: BookingModel[];
}
