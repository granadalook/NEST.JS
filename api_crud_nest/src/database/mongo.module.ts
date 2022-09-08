/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Global() // con esto hacemos un modulo global para  toda la app
@Module({
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
