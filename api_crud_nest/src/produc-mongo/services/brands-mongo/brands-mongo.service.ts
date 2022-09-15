/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
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
    if (respuesta.length === 0) {
      throw new NotFoundException(`NO EXISTEN MARCAS`);
    }
    return respuesta;
  }

  async findOne(id: string) {
    const product = await this.brandModel.findOne({ id: id }).lean().exec();
    if (!product) {
      throw new NotFoundException(`MARCA DE ${id} NO EXISTE`);
    }

    return product;
  }

  async create(data: CreateBrandMongoDto) {
    /*  const newBrand = await new this.brandModel(data);
    newBrand.save();
    const brand = newBrand.toJSON();
    brand._id = brand._id.toString();
    return brand; */
    data = { ...data, id: new mongoose.Types.ObjectId().toString() };
    const newBrand = await new this.brandModel(data);
    newBrand.save();
    const brand = newBrand.toJSON();
    return brand;
  }

  async update(id: string, changes: UpdateBrandMongoDto) {
    const brand = await this.findOne(id);
    const updatebrand = await this.brandModel
      .findOneAndUpdate({ id: id }, changes, {
        new: true,
        upsert: true,
      })
      .lean();
    return updatebrand;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    const dele = await this.brandModel.findOneAndDelete({ id: id });
    return { message: { ELIMINADO: product } };
  }
}
