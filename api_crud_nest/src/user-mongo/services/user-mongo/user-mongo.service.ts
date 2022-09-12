import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bycryp from 'bcrypt';

import { User } from '../../entities/userMongo.entity';
import { CreateUserDto, UpdateUserDto } from '../../dtos/userMongo.entity';
import { ProductMongoService } from '../../../produc-mongo/services/product-mongo/product-mongo.service';

@Injectable()
export class UserMongoService {
  constructor(
    private productsService: ProductMongoService,
    @Inject('MONGO') private databaseMongo: Db,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll() {
    return this.userModel.find().exec();
  }

  getTasks() {
    const tasksCollection = this.databaseMongo.collection('tasks');
    return tasksCollection.find().toArray();
  }

  async findOne(id: string) {
    return this.userModel.findById(id);
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

  async create(data: CreateUserDto) {
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

  update(id: string, changes: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
