import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { VehicleStatus } from 'src/domain/enums/vehicle.enum';

export class CreateVehicleDto {
  @IsString()
  title: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  hourlyRate: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  dailyRate: number;

  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;
}

export class FindAllVehiclesQuery {
  page: number;
  limit: number;
}