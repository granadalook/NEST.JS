/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';

@Global() // con esto hacemos un modulo global para  toda la app
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      user: 'granada',
      pass: 'granada',
      dbName: 'platzi-store',
    }),
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async () => {
        const uri =
          'mongodb://granada:granada@localhost:27017/?authMechanism=DEFAULT';
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('platzi-store');
        return database;
      },
    },
  ],
  exports: ['MONGO'],
})
export class MongoModule {}
