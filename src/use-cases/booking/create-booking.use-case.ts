import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { calculateBookingTotalAmount } from 'src/domain/booking/booking-pricing';
import { VehicleStatus } from 'src/domain/enums/vehicle.enum';
import { BookingModel } from 'src/domain/models/booking.model';
import { BookingRepository } from 'src/infastructure/repositories/booking.repository';
import { VehicleRepository } from 'src/infastructure/repositories/vehicle.repository';
import { CreateBookingDto } from 'src/infastructure/controllers/booking/dto/create-booking.dto';

@Injectable()
export class CreateBookingUseCase {
  constructor(
    @Inject(VehicleRepository)
    private readonly _vehicleRepository: VehicleRepository,

    @Inject(BookingRepository)
    private readonly _bookingRepository: BookingRepository,
  ) {}

  async execute(dto: CreateBookingDto): Promise<BookingModel> {
    //create dates
    const pickup = new Date(dto.pickupDateTime);
    const returnDate = new Date(dto.returnDateTime);

    //validate dates
    if (Number.isNaN(pickup.getTime())) {
      throw new BadRequestException('pickupDateTime must be a valid date');
    }
    if (Number.isNaN(returnDate.getTime())) {
      throw new BadRequestException('returnDateTime must be a valid date');
    }

    //validate pickup date is in the future
    const now = new Date();
    if (pickup < now || returnDate < now) {
      throw new BadRequestException(
        'pickupDateTime and returnDateTime cannot be in the past. Bookings must start from now or later',
      );
    }

    //validate return date is after pickup date
    if (returnDate <= pickup) {
      throw new BadRequestException(
        'returnDateTime must be after pickupDateTime',
      );
    }

    //check if vehicle exists
    const vehicle = await this._vehicleRepository.findById(dto.vehicleId);
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with id ${dto.vehicleId} not found`);
    }

    //validate vehicle is active
    if (vehicle.status !== VehicleStatus.ACTIVE) {
      throw new BadRequestException('Vehicle is not active');
    }

    //check if there is an overlapping booking
    const overlaps = await this._bookingRepository.existsOverlapping(
      dto.vehicleId,
      pickup,
      returnDate,
    );

    if (overlaps) {
      throw new ConflictException(
        'This vehicle already has a booking that overlaps the requested period',
      );
    }

    //calculate total amount
    const totalAmount = calculateBookingTotalAmount(
      pickup,
      returnDate,
      dto.pricingMode,
      vehicle.hourlyRate,
      vehicle.dailyRate,
    );

    return this._bookingRepository.create({
      vehicleId: dto.vehicleId,
      pickupDateTime: pickup,
      returnDateTime: returnDate,
      pricingMode: dto.pricingMode,
      totalAmount,
    });
  }
}
