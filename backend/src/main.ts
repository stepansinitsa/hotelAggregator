import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './application.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const configService = app.get(ConfigService);
  const PORT = configService.get('HTTP_PORT');

  await app.listen(PORT);
}

bootstrap();
