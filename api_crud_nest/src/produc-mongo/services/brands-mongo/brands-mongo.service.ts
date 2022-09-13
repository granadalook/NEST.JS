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

  findAll() {
    return this.brandModel.find().lean().exec();
  }

  async findOne(id: string) {
    const product = await this.brandModel.findOne({ _id: id }).lean().exec();
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  create(data: CreateBrandMongoDto) {
    const newBrand = new this.brandModel(data);
    return newBrand.save();
  }

  async update(id: string, changes: UpdateBrandMongoDto) {
    const product = await this.brandModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  remove(id: string) {
    return this.brandModel.findByIdAndDelete(id);
  }
}
