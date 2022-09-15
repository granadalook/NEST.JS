/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Db } from 'mongodb';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bycryp from 'bcrypt';

import { User } from '../../entities/userMongo.entity';
import {
  CreateUserMongoDto,
  UpdateUserMongoDto,
} from '../../dtos/userMongo.dto';
import { ProductMongoService } from '../../../produc-mongo/services/product-mongo/product-mongo.service';

@Injectable()
export class UserMongoService {
  constructor(
    private productsService: ProductMongoService,
    @Inject('MONGO') private databaseMongo: Db,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll() {
    return this.userModel.find().lean().exec();
  }

  getTasks() {
    const tasksCollection = this.databaseMongo.collection('tasks');
    const tarea = tasksCollection.find().toArray();

    return;
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ id: id }).lean();
    if (!user) {
      throw new NotFoundException(`USUARIO ${id} NO EXISTE`);
    }
    return user;
  }

  async getOrdersByUser(userId: string) {
    const user = await this.findOne(userId);
    return {
      date: new Date(),
      user,
      // products: this.productsService.findAll(),
      products: [],
    };
  }

  async create(data: CreateUserMongoDto) {
    data = { ...data, id: new mongoose.Types.ObjectId().toString() };
    const newModel = new this.userModel(data);
    const hashPassword = await bycryp.hash(data.password, 10);
    newModel.password = hashPassword;
    const model = newModel.save();
    const { password, ...respuesta } = (await model).toJSON();
    return respuesta;
  }
  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, changes: UpdateUserMongoDto) {
    const user = await this.findOne(id);
    const updateUser = await this.userModel
      .findOneAndUpdate({ id: id }, changes, {
        new: true,
        upsert: true,
      })
      .lean();
    return updateUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    const dele = await this.userModel.findOneAndDelete({ id: id });
    return { message: { ELIMINADO: user } };
  }
}
