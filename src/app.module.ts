import { Module } from '@nestjs/common';
import { AppController } from './infastructure/controllers/app.controller';
import { AppService } from './use-cases/app.service';
import { UseCaseModule } from './use-cases/use-case.module';

@Module({
  imports: [UseCaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
