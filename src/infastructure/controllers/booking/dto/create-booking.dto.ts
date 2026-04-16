import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, Min } from 'class-validator';
import { PricingMode } from 'src/domain/enums/booking.enum';

export class CreateBookingDto {
  @ApiProperty({ example: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  vehicleId: number;

  @ApiProperty({
    example: '2026-04-20T11:00:00',
    description: 'ISO 8601 datetime; pickup must not be in the past',
  })
  @IsDateString()
  pickupDateTime: string;

  @ApiProperty({
    example: '2026-04-20T15:00:00',
    description: 'ISO 8601 datetime; must be after pickupDateTime',
  })
  @IsDateString()
  returnDateTime: string;

  @ApiProperty({ enum: PricingMode, example: PricingMode.HOURLY })
  @IsEnum(PricingMode)
  pricingMode: PricingMode;
}
