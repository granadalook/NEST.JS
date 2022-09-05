import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controllers/products/products.controller'; //CONTROLADOR
import { ProductService } from './services/product/product.service'; // SERVICIO
import { Product } from '../products/entities/product.entity'; // ENTIDAD

import { CategoriesController } from './controllers/categories/categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController, CategoriesController], //controladores
  providers: [ProductService], //servicios
  exports: [ProductService], // exportaciones de servicios
})
export class ProductsModule {}
