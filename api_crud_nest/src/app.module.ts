import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsController } from './controllers/products/products.controller';
import { ProductService } from './services/product/product.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, CategoriesController], //controladores
  providers: [AppService, ProductService], // servicios
})
export class AppModule {}
