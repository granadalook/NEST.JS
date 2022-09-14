import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
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
    const id = respuesta.map((item) => item._id);
    const idString = id.map((id) => id.toJSON());
    return { message: { idString, respuesta } };
  }

  async findOne(id: string) {
    const cliente = await this.customerModel.findOne({ _id: id }).lean().exec();

    if (!cliente) {
      throw new NotFoundException(`CLIENTE ${id} NO EXISTE`);
    }
    cliente._id = cliente._id.toString();
    console.log('cliente._id', cliente._id);
    console.log('cliente.id', cliente.id);
    return cliente;
  }

  async create(data: CreateCustomerMongoDto) {
    const newClient = await new this.customerModel(data);
    newClient.save();
    const client = newClient.toJSON();
    client._id = client._id.toString();
    return client;
  }

  async update(id: string, changes: UpdateCustomerMongoDto) {
    const client = await this.customerModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .lean()
      .exec();
    if (!client) {
      throw new NotFoundException(`MARCA DE ${id} NO EXISTE`);
    }
    client._id = client._id.toString();
    return client;
  }

  async remove(id: string) {
    const clientDelete = await this.customerModel
      .findByIdAndDelete(id)
      .lean()
      .exec();
    if (!clientDelete) {
      throw new NotFoundException(`MARCA DE ${id} NO EXISTE`);
    }
    clientDelete._id = clientDelete._id.toString();
    return clientDelete;
  }
}
