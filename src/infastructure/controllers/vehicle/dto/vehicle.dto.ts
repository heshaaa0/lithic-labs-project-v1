import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { VehicleStatus } from 'src/domain/enums/vehicle.enum';

export class CreateVehicleDto {
  @ApiProperty({ example: 'Toyota Prius' })
  @IsString()
  title: string;

  @ApiProperty({ example: 2500, minimum: 0 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  hourlyRate: number;

  @ApiProperty({ example: 12000, minimum: 0 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  dailyRate: number;

  @ApiPropertyOptional({ enum: VehicleStatus, example: VehicleStatus.ACTIVE })
  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;
}

export class UpdateVehicleDto {
  @ApiPropertyOptional({ example: 'Toyota Prius Hybrid' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 3000, minimum: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  hourlyRate?: number;

  @ApiPropertyOptional({ example: 14000, minimum: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  dailyRate?: number;

  @ApiPropertyOptional({ enum: VehicleStatus })
  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;
}

export class FindAllVehiclesQuery {
  page: number;
  limit: number;
}