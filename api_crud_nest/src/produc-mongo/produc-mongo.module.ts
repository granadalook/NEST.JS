/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Category,
  CategorySchema,
} from '../produc-mongo/entities/categoryMongo.entity';
import { BrandMongoController } from './controllers/brand-mongo/brand-mongo.controller';
import { CategoryMongoController } from './controllers/category-mongo/category-mongo.controller';
import { ProducMongoController } from './controllers/produc-mongo/produc-mongo.controller';
import { Brand, BrandSchema } from './entities/brandMongo.entity';
import { Product, ProductSchema } from './entities/productMongo.entiti';
import { BrandsMongoService } from './services/brands-mongo/brands-mongo.service';
import { CategorysMongoService } from './services/categorys-mongo/categorys-mongo.service';
import { ProductMongoService } from './services/product-mongo/product-mongo.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Brand.name,
        schema: BrandSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [ProductMongoService, CategorysMongoService, BrandsMongoService],
  controllers: [
    ProducMongoController,
    CategoryMongoController,
    BrandMongoController,
  ],
  exports: [ProductMongoService],
})
export class ProducMongoModule {}
