/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // importacion de  ORM
import { Client } from 'pg';
// Para conectarse a la base de datos
const client = new Client({
  user: 'granada',
  host: 'localhost',
  database: 'nestjs',
  password: 'grana123',
  port: 5434,
});
client.connect();
@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      // creacion del modulo 👈 entity
      type: 'postgres',
      host: 'localhost',
      username: 'granada',
      database: 'nestjs',
      password: 'grana123',
      port: 5434,
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
