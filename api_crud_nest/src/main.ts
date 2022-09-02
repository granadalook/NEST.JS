import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder() // DOCUMENTAR CON SWAGGER
    .setTitle('CRUD CON NEST')
    .setDescription('BACK-END  CON NEST.JS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  ); //  asi se activa las validaciones

  await app.listen(3000); // puerto  en el que  corre la aplicacion
}
bootstrap();
