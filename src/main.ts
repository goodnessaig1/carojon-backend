import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Allow all origins. Change this to specific domains for security.
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allowed headers
    credentials: true, // Allow cookies to be included in requests
  });

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}
bootstrap();
