import { Module } from '@nestjs/common';
import { AppController } from './infastructure/controllers/app.controller';
import { AppService } from './use-cases/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
