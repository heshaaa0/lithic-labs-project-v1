import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigureModule } from './infastructure/configure/configure.module';
import { Configuration } from './infastructure/configure/configuration';
import { VehicleController } from './infastructure/controllers/vehicle/vehicle.controller';
import { BookingEntity } from './infastructure/entity/booking.entity';
import { VehicleEntity } from './infastructure/entity/vehicle.entity';
import { AppService } from './use-cases/app.service';
import { UseCaseModule } from './use-cases/use-case.module';

@Module({
  imports: [
    ConfigureModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigureModule],
      inject: [Configuration],
      useFactory: (configuration: Configuration) => ({
        type: 'postgres',
        host: configuration.databaseHost,
        port: configuration.databasePort,
        username: configuration.databaseUsername,
        password: configuration.databasePassword,
        database: configuration.databaseName,
        entities: [VehicleEntity, BookingEntity],
        synchronize: configuration.databaseSynchronize,
      }),
    }),
    UseCaseModule,
  ],
  controllers: [VehicleController],
  providers: [AppService],
})
export class AppModule {}
