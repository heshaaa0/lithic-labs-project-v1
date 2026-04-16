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
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BookingModel } from 'src/domain/models/booking.model';
import { BookingResponseDto } from './dto/booking-response.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreateBookingUseCase } from 'src/use-cases/booking/create-booking.use-case';
import { GetAllBookingsUseCase } from 'src/use-cases/booking/get-all-bookings.use-case';
import { GetBookingByIdUseCase } from 'src/use-cases/booking/get-booking-by-id.use-case';

@ApiTags('bookings')
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
  @ApiOperation({ summary: 'Create a booking' })
  @ApiCreatedResponse({ type: BookingResponseDto })
  @ApiBadRequestResponse({
    description: 'Validation failed or business rule (inactive vehicle, past pickup, etc.)',
  })
  @ApiNotFoundResponse({ description: 'Vehicle not found' })
  @ApiConflictResponse({
    description: 'Overlapping booking for the same vehicle',
  })
  create(@Body() dto: CreateBookingDto): Promise<BookingModel> {
    return this._createBookingUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all bookings' })
  @ApiOkResponse({ type: [BookingResponseDto] })
  findAll(): Promise<BookingModel[]> {
    return this._getAllBookingsUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking by id' })
  @ApiOkResponse({ type: BookingResponseDto })
  @ApiNotFoundResponse({ description: 'Booking not found' })
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
