/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Customer } from '../../entities/custumerMongo.entity';
import {
  CreateCustomerMongoDto,
  UpdateCustomerMongoDto,
} from '../../dtos/customerMongo.dto';

@Injectable()
export class CustomerMongoService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async findAll() {
    const respuesta = await this.customerModel.find().lean().exec();

    return respuesta;
  }

  async findOne(id: string) {
    const client = await this.customerModel.findOne({ id: id }).lean();
    if (!client) {
      throw new NotFoundException(`PRODUCTO ${id} NO EXISTE`);
    }
    return client;
  }

  async create(data: CreateCustomerMongoDto) {
    data = { ...data, id: new mongoose.Types.ObjectId().toString() };
    const newClient = await new this.customerModel(data);
    newClient.save();
    const Client = newClient.toJSON();
    return Client;
  }

  async update(id: string, changes: UpdateCustomerMongoDto) {
    const client = await this.findOne(id);
    const updateclient = await this.customerModel
      .findOneAndUpdate({ id: id }, changes, {
        new: true,
        upsert: true,
      })
      .lean();
    return updateclient;
  }

  async remove(id: string) {
    const client = await this.findOne(id);
    const dele = await this.customerModel.findOneAndDelete({ id: id });
    return { message: { ELIMINADO: client } };
  }
}
