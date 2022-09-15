/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Order } from '../../entities/orderMongo.entity';
import {
  CreateOrderMongoDto,
  UpdateOrderMongoDto,
} from '../../dtos/orderMongo.dto';

@Injectable()
export class OrderMongoService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async findAll() {
    const respuesta = await this.orderModel
      .find()
      //.populate('customer')
      .populate('products')
      .lean()
      .exec();

    return respuesta;
  }

  async findOne(id: string) {
    const order = await this.orderModel.findOne({ id: id }).lean();
    if (!order) {
      throw new NotFoundException(`PRODUCTO ${id} NO EXISTE`);
    }
    return order;
  }

  async create(data: CreateOrderMongoDto) {
    data = { ...data, id: new mongoose.Types.ObjectId().toString() };
    const newOrder = await new this.orderModel(data);
    newOrder.save();
    const order = newOrder.toJSON();
    return order;
  }

  async update(id: string, changes: UpdateOrderMongoDto) {
    const order = await this.findOne(id);
    const updateOrder = await this.orderModel
      .findOneAndUpdate({ id: id }, changes, {
        new: true,
        upsert: true,
      })
      .lean();
    return updateOrder;
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    const dele = await this.orderModel.findOneAndDelete({ id: id });
    return { message: { ELIMINADO: { order } } };
  }

  // arreglar
  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findOne({ id: id });
    const produ = order.products.map((item) => item._id);
    const index = produ.indexOf(productId);
    const dele = produ.splice(index, 1);

    console.log('dele', dele);
    console.log('index', index);
    console.log('produ', produ);
    return dele;
  }
  // arreglar
  async addProducts(id: string, productsIds: string[]) {
    const order = await this.orderModel.findOne({ id: id });
    productsIds.forEach((pId) => order.products.push(pId));
    return order.save();
  }
}
