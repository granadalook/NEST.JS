import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Order } from '../../entities/orderMongo.entity';
import { CreateOrderDto, UpdateOrderDto } from '../../dtos/orderMongo.dto';

@Injectable()
export class OrderMongoService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  findAll() {
    return this.orderModel
      .find()
      .populate('customer')
      .populate('products')
      .lean()
      .exec();
  }

  findOne(id: string) {
    const order = this.orderModel.findById(id).lean().exec();
    if (!order) {
      throw new NotFoundException(`PRODUCTO ${id} NO EXISTE`);
    }
    return order;
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
  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id);
    order.products.pull(productId);
    return order.save();
  }

  async addProducts(id: string, productsIds: string[]) {
    const order = await this.orderModel.findById(id);
    productsIds.forEach((pId) => order.products.push(pId));
    return order.save();
  }
}
