/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controllers/products/products.controller'; //CONTROLADOR
import { ProductService } from './services/product/product.service'; // SERVICIO

import { CategoriesController } from './controllers/categories/categories.controller';
import { Product } from './entities/product.entity';
import { BrandsService } from './services/brands/brands.service';
import { CategoriesService } from './services/categories/categories.service';
import { BrandsController } from './controllers/brands/brands.controller';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category])], //  entidades
  controllers: [ProductsController, CategoriesController, BrandsController], //controladores
  providers: [ProductService, BrandsService, CategoriesService], //servicios
  exports: [ProductService, TypeOrmModule], // exportaciones de servicios
})
export class ProductsModule {}
