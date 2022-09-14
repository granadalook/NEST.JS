import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
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
    console.log('params', params);
    if (params) {
      const filters: FilterQuery<Product> = {};
      const { limit, offset, minPrice, maxPrice } = params; // decosntruccion de javaScript

      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice }; //gte y lte  == mayor igual y menir e igual
        return this.productModel.find(filters).lean().exec();
      }
      const ras = await this.productModel
        .find()
        .populate('brand')
        .skip(offset)
        .limit(limit)
        .lean()
        .exec();
      console.log('ras', ras);
      return ras;
    }
    const res = await this.productModel.find().populate('brand').lean().exec(); ///  con populate se resuelve la relacion  referenciada
    console.log('res', res);
    return res;
  }

  async findOne(id: string) {
    const product = await (await this.productModel.findById(id)).toJSON();

    product._id = product._id.toString();

    if (!product) {
      throw new NotFoundException(`PRODUCTO ${id} NO EXISTE`);
    }
    return product;
  }

  async create(data: CreateProductMongoDto) {
    const newProduct = await new this.productModel(data);
    newProduct.save();
    const product = newProduct.toJSON();
    product._id = product._id.toString();
    return product;
  }

  async update(id: string, changes: UpdateProductMongoDto) {
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .lean()
      .exec();
    if (!product) {
      throw new NotFoundException(`PRODUCTO ${id} NO EXISTE`);
    }
    product._id = product._id.toString();
    return product;
  }

  async remove(id: string) {
    const productDelete = await this.productModel
      .findByIdAndDelete(id)
      .lean()
      .exec();
    if (!productDelete) {
      throw new NotFoundException(`PRODUCTO ${id} NO EXISTE`);
    }
    return productDelete;
  }
}
