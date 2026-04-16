import { Module } from '@nestjs/common';
import { AppController } from './infastructure/controllers/app.controller';
import { ConfigureModule } from './infastructure/configure/configure.module';
import { AppService } from './use-cases/app.service';
import { UseCaseModule } from './use-cases/use-case.module';

@Module({
  imports: [ConfigureModule, UseCaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
