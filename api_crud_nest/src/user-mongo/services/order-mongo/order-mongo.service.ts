import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Order } from '../../entities/orderMongo.entity';
import { CreateOrderDto, UpdateOrderDto } from '../../dtos/orderMongo.dto';

@Injectable()
export class OrderMongoService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  findAll() {
    return this.orderModel.find().exec();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id);
  }

  create(data: CreateOrderDto) {
    const newModel = new this.orderModel(data);
    return newModel.save();
  }

  update(id: string, changes: UpdateOrderDto) {
    return this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
}
