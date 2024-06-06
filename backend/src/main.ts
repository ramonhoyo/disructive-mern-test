import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MongoExceptionFilter } from './utils/validation/mongo-exception-filter';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MongoExceptionFilter())

  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
  await app.listen(port);
}
bootstrap();
