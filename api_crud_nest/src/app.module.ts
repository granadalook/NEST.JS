/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
//import { MongoClient } from 'mongodb';
import { MongoModule } from './database/mongo.module';
import { ProducMongoModule } from './produc-mongo/produc-mongo.module';
import { UserMongoModule } from './user-mongo/user-mongo.module';
import { SecurityModule } from './security/security.module';

/* const uri = 'mongodb://granada:granada@localhost:27017/?authMechanism=DEFAULT';

const client = new MongoClient(uri);
async function run() {
  await client.connect();
  const database = client.db('platzi-store');
  const taskCollection = database.collection('tasks');
  const tasks = await taskCollection.find().toArray();
  console.log(tasks);
}
run(); */
@Module({
  imports: [
    UsersModule,
    ProductsModule,
    DatabaseModule,
    MongoModule,
    ProducMongoModule,
    UserMongoModule,
    SecurityModule,
  ], //modulos
  controllers: [AppController], //controladores
  providers: [AppService], // servicios
})
export class AppModule {}
