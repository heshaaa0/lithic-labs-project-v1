import { ApiProperty } from '@nestjs/swagger';
import { VehicleStatus } from 'src/domain/enums/vehicle.enum';

export class VehicleResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Toyota Prius' })
  title: string;

  @ApiProperty({ example: 2500 })
  hourlyRate: number;

  @ApiProperty({ example: 12000 })
  dailyRate: number;

  @ApiProperty({ enum: VehicleStatus, example: VehicleStatus.ACTIVE })
  status: VehicleStatus;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt: Date;
}

export class PaginatedVehiclesResponseDto {
  @ApiProperty({ type: [VehicleResponseDto] })
  data: VehicleResponseDto[];

  @ApiProperty({ example: 42 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;
}

export class DeleteVehicleResponseDto {
  @ApiProperty({ example: 'Vehicle deleted successfully' })
  message: string;
}
