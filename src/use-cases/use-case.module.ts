import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from 'src/infastructure/entity/booking.entity';
import { VehicleEntity } from 'src/infastructure/entity/vehicle.entity';
import { BookingRepository } from 'src/infastructure/repositories/booking.repository';
import { VehicleRepository } from 'src/infastructure/repositories/vehicle.repository';
import { VehicleCreateUseCase } from './vehicle/vehicle-create.use-case';

const useCaseProviders = [VehicleCreateUseCase];

const repositoryProviders = [VehicleRepository, BookingRepository];
@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity, BookingEntity])],
  providers: [...useCaseProviders, ...repositoryProviders],
  exports: [...useCaseProviders, ...repositoryProviders],
})
export class UseCaseModule {}
