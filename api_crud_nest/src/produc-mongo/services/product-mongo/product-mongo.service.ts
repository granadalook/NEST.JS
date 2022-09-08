import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../../dto/productMongo.dtos';
import { Product } from '../../entities/product.entiti';

@Injectable()
export class ProductMongoService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  findAll(params?: FilterProductsDto) {
    if (params) {
      const filters: FilterQuery<Product> = {};
      const { limit, offset } = params; // decosntruccion de javaScript
      const { minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice }; //gte y lte  == mayor igual y menir e igual
        return this.productModel.find(filters).lean().exec();
      }
      return this.productModel.find().skip(offset).limit(limit).lean().exec();
    }
    return this.productModel.find().lean().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).lean().exec();
    if (!product) {
      throw new NotFoundException(`PRODUCTO ${id} NO EXISTE`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    const newProduct = new this.productModel(data);
    Logger.warn(newProduct.id);
    Logger.warn(typeof newProduct.id);
    return newProduct.save();
  }

  update(id: string, changes: UpdateProductDto) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`PRODUCTO ${id} NO EXISTE`);
    }
    return product;
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
