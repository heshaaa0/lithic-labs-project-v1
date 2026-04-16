import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from 'src/infastructure/entity/booking.entity';
import { VehicleEntity } from 'src/infastructure/entity/vehicle.entity';
import { BookingRepository } from 'src/infastructure/repositories/booking.repository';
import { VehicleRepository } from 'src/infastructure/repositories/vehicle.repository';
import { VehicleCreateUseCase } from './vehicle/vehicle-create.use-case';
import { GetAllVehicleUseCase } from './vehicle/get-all-vehicle.use-case';
import { GetByIdVehicleUseCase } from './vehicle/get-by-id-vehicle.use-case';
import { UpdateVehicleUseCase } from './vehicle/update-vehicle.use-case';

const useCaseProviders = [
  VehicleCreateUseCase,
  GetAllVehicleUseCase,
  GetByIdVehicleUseCase,
  UpdateVehicleUseCase,
];

const repositoryProviders = [VehicleRepository, BookingRepository];
@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity, BookingEntity])],
  providers: [...useCaseProviders, ...repositoryProviders],
  exports: [...useCaseProviders, ...repositoryProviders],
})
export class UseCaseModule {}
