import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Configuration } from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'development.env',
    }),
  ],
  providers: [Configuration],
  exports: [Configuration],
})
export class ConfigureModule {}
