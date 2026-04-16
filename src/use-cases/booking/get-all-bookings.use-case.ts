import { Inject, Injectable } from '@nestjs/common';
import { BookingModel } from 'src/domain/models/booking.model';
import { BookingRepository } from 'src/infastructure/repositories/booking.repository';

@Injectable()
export class GetAllBookingsUseCase {
  constructor(
    @Inject(BookingRepository)
    private readonly _bookingRepository: BookingRepository,
  ) {}

  execute(): Promise<BookingModel[]> {
    return this._bookingRepository.findAll();
  }
}
