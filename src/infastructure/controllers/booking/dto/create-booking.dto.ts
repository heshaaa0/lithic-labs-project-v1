import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, Min } from 'class-validator';
import { PricingMode } from 'src/domain/enums/booking.enum';

export class CreateBookingDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  vehicleId: number;

  @IsDateString()
  pickupDateTime: string;

  @IsDateString()
  returnDateTime: string;

  @IsEnum(PricingMode)
  pricingMode: PricingMode;
}
