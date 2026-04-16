import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './infastructure/controllers/app.controller';
import { ConfigureModule } from './infastructure/configure/configure.module';
import { Configuration } from './infastructure/configure/configuration';
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
        autoLoadEntities: true,
        synchronize: configuration.databaseSynchronize,
      }),
    }),
    UseCaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
