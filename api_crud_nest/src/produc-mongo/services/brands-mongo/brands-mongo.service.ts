import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Brand } from '../../entities/brandMongo.entity';
import {
  CreateBrandMongoDto,
  UpdateBrandMongoDto,
} from '../../dto/brandMongo.dto';

@Injectable()
export class BrandsMongoService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async findAll() {
    const respuesta = await this.brandModel.find().lean().exec();
    const id = respuesta.map((item) => item._id);
    const idString = id.map((id) => id.toJSON());
    return { message: { idString, respuesta } };
  }

  async findOne(id: string) {
    const product = await this.brandModel.findOne({ _id: id }).lean().exec();
    product._id = product._id.toString();
    if (!product) {
      throw new NotFoundException(`MARCA DE ${id} NO EXISTE`);
    }
    product._id = product._id.toString();
    return product;
  }

  async create(data: CreateBrandMongoDto) {
    const newBrand = await new this.brandModel(data);
    newBrand.save();
    const brand = newBrand.toJSON();
    brand._id = brand._id.toString();
    return brand;
  }

  async update(id: string, changes: UpdateBrandMongoDto) {
    const brand = await this.brandModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .lean()
      .exec();
    if (!brand) {
      throw new NotFoundException(`MARCA DE ${id} NO EXISTE`);
    }
    brand._id = brand._id.toString();
    return brand;
  }

  async remove(id: string) {
    const bransDelete = await this.brandModel
      .findByIdAndDelete(id)
      .lean()
      .exec();
    if (!bransDelete) {
      throw new NotFoundException(`MARCA DE ${id} NO EXISTE`);
    }
    bransDelete._id = bransDelete._id.toString();
    return bransDelete;
  }
}
