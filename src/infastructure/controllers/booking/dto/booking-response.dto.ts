import { ApiProperty } from '@nestjs/swagger';
import { PricingMode } from 'src/domain/enums/booking.enum';

export class BookingResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  vehicleId: number;

  @ApiProperty({ type: String, format: 'date-time' })
  pickupDateTime: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  returnDateTime: Date;

  @ApiProperty({ enum: PricingMode, example: PricingMode.HOURLY })
  pricingMode: PricingMode;

  @ApiProperty({ example: 10000, description: 'Total price in smallest currency unit' })
  totalAmount: number;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt: Date;
}
