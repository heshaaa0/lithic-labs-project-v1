import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BookingModel } from 'src/domain/models/booking.model';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreateBookingUseCase } from 'src/use-cases/booking/create-booking.use-case';
import { GetAllBookingsUseCase } from 'src/use-cases/booking/get-all-bookings.use-case';
import { GetBookingByIdUseCase } from 'src/use-cases/booking/get-booking-by-id.use-case';

@Controller('bookings')
export class BookingController {
  constructor(
    @Inject(CreateBookingUseCase)
    private readonly _createBookingUseCase: CreateBookingUseCase,

    @Inject(GetAllBookingsUseCase)
    private readonly _getAllBookingsUseCase: GetAllBookingsUseCase,
    
    @Inject(GetBookingByIdUseCase)
    private readonly _getBookingByIdUseCase: GetBookingByIdUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateBookingDto): Promise<BookingModel> {
    return this._createBookingUseCase.execute(dto);
  }

  @Get("all")
  findAll(): Promise<BookingModel[]> {
    return this._getAllBookingsUseCase.execute();
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BookingModel> {
    const booking = await this._getBookingByIdUseCase.execute(id);
    if (!booking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }
    return booking;
  }
}
