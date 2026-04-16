import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from 'src/infastructure/entity/booking.entity';
import { VehicleEntity } from 'src/infastructure/entity/vehicle.entity';
import { BookingRepository } from 'src/infastructure/repositories/booking.repository';
import { VehicleRepository } from 'src/infastructure/repositories/vehicle.repository';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity, BookingEntity])],
  providers: [AppService, VehicleRepository, BookingRepository],
  exports: [VehicleRepository, BookingRepository],
})
export class UseCaseModule {}
