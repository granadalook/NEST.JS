/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [UsersModule, ProductsModule, DatabaseModule],
  controllers: [AppController], //controladores
  providers: [AppService], // servicios
})
export class AppModule {}
