import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Configuration } from './infastructure/configure/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configuration = app.get(Configuration);

  await app.listen(configuration.port);
}
bootstrap();
