/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // importacion de  ORM
import { Client } from 'pg';
// Para conectarse a la base de datos
const client = new Client({
  user: 'granada', //stiven
  host: 'localhost',
  database: 'nestjs', //nodejs
  password: 'grana123', //admin123
  port: 5434, //5434
});
client.connect();
@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      // creacion del modulo 👈 entity
      type: 'postgres', //postgres
      host: 'localhost',
      username: 'granada', //stiven
      database: 'nestjs', //nodejs
      password: 'grana123', //admin123
      port: 5434, //5434
      synchronize: true, // sincronizacion hacia la tabla  automatica
      autoLoadEntities: true,
    }),
  ],
  providers: [
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['PG', TypeOrmModule],
})
export class DatabaseModule {}
