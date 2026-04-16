import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Configuration } from './infastructure/configure/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configuration = app.get(Configuration);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  //swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Lithic Labs Vehicle Bookings API')
    .setDescription(
      'Vehicle rental booking API: vehicles CRUD, bookings with pricing and overlap rules.',
    )
    .setVersion('1.0')
    .addTag('vehicles', 'Vehicle management')
    .addTag('bookings', 'Booking management')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'docs/json',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(configuration.port);
}
bootstrap();
