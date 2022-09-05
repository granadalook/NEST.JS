import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // importacion de  ORM
import { Client } from 'pg';
// Para conectarse a la base de datos
const client = new Client({
  user: 'stiven',
  host: 'localhost',
  database: 'nosejs',
  password: 'admin123',
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
      username: 'stiven',
      database: 'nosejs',
      password: 'admin123',
      port: 5434,
      synchronize: true,
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
