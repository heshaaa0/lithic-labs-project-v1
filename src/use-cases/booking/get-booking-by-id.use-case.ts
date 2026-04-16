import { Inject, Injectable } from '@nestjs/common';
import { BookingModel } from 'src/domain/models/booking.model';
import { BookingRepository } from 'src/infastructure/repositories/booking.repository';

@Injectable()
export class GetBookingByIdUseCase {
  constructor(
    @Inject(BookingRepository)
    private readonly _bookingRepository: BookingRepository,
  ) {}

  execute(id: number): Promise<BookingModel | null> {
    return this._bookingRepository.findById(id);
  }
}
