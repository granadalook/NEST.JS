/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateProductMongoDto,
  FilterProductsMongoDto,
  UpdateProductMongoDto,
} from '../../dto/productMongo.dtos';
import { Product } from '../../entities/productMongo.entiti';

@Injectable()
export class ProductMongoService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(params?: FilterProductsMongoDto) {
    if (params) {
      const filters: FilterQuery<Product> = {};
      const { limit, offset, minPrice, maxPrice } = params; // decosntruccion de javaScript

      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice }; //gte y lte  == mayor igual y menir e igual
        return this.productModel.find(filters).lean().exec();
      }
      const ras = await this.productModel
        .find()
        //.populate('brand')
        .skip(offset)
        .limit(limit)
        .lean()
        .exec();
      if (ras.length === 0) {
        throw new NotFoundException(`NO EXISTEN PRODUCTOS`);
      }
      return ras;
    }

    return await this.productModel.find().populate('brand').lean().exec(); ///  con populate se resuelve la relacion  referenciada
  }

  async findOne(id: string) {
    const product = await this.productModel.findOne({ id: id }).lean();
    if (!product) {
      throw new NotFoundException(`PRODUCTO ${id} NO EXISTE`);
    }
    return product;
  }

  async create(data: CreateProductMongoDto) {
    data = { ...data, id: new mongoose.Types.ObjectId().toString() };
    const newProduct = await new this.productModel(data);
    newProduct.save();
    const product = newProduct.toJSON();
    return product;
  }

  async update(id: string, changes: UpdateProductMongoDto) {
    const product = await this.findOne(id);
    const updateProducts = await this.productModel
      .findOneAndUpdate({ id: id }, changes, {
        new: true,
        upsert: true,
      })
      .lean();
    return updateProducts;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    const dele = await this.productModel.findOneAndDelete({ id: id });
    return { message: { ELIMINADO: product } };
  }
}
