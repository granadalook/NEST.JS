/* eslint-disable prettier/prettier */
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
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
  SwaggerModule.setup('docs', app, document); // DOCUMENTAR CON SWAGGER
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true }, // convierte todos los query params  a numero  de forma implicita
    }),
  ); //  asi se activa las validaciones

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors(); //  asi se habilitan  todas las cors
  await app.listen(3000); // puerto  en el que  corre la aplicacion
}
bootstrap();
