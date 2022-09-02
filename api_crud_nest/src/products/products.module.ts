import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsController } from './controllers/products/products.controller';
import { ProductService } from './services/product/product.service';

@Module({
  controllers: [ProductsController, CategoriesController], //controladores
  providers: [ProductService], //servicios
  exports: [ProductService], // exportaciones de servicios
})
export class ProductsModule {}
