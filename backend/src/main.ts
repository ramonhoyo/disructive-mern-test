import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MongoExceptionFilter } from './utils/validation/mongo-exception-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MongoExceptionFilter())
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Multimedia')
    .setDescription('Automatic api description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
  await app.listen(port);
}

bootstrap();
