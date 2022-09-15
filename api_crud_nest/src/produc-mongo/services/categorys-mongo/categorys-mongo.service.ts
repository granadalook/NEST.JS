import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../../entities/categoryMongo.entity';
import {
  CreateCategoryMongoDto,
  UpdateCategoryMongoDto,
} from '../../dto/categoryMongo.dtos';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class CategorysMongoService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  findAll() {
    return this.categoryModel.find().lean();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findOne({ id: id }).lean();
    if (!category) {
      throw new NotFoundException(`CATEGORIA ${id} NO EXISTE`);
    }
    return category;
  }

  async create(data: CreateCategoryMongoDto) {
    data = { ...data, id: new mongoose.Types.ObjectId().toString() };
    const newcategory = await new this.categoryModel(data);
    newcategory.save();
    const category = newcategory.toJSON();
    return category;
  }

  async update(id: string, changes: UpdateCategoryMongoDto) {
    const category = await this.findOne(id);
    const updatecategory = await this.categoryModel
      .findOneAndUpdate({ id: id }, changes, {
        new: true,
        upsert: true,
      })
      .lean();
    return updatecategory;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    const dele = await this.categoryModel.findOneAndDelete({ id: id });
    return { message: { ELIMINADO: product } };
  }
}
