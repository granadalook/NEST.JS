import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Customer } from '../../entities/custumerMongo.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from '../../dtos/customerMongo.dto';

@Injectable()
export class CustomerMongoService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  findAll() {
    return this.customerModel.find().exec();
  }

  async findOne(id: string) {
    return this.customerModel.findById(id);
  }

  create(data: CreateCustomerDto) {
    const newModel = new this.customerModel(data);
    return newModel.save();
  }

  update(id: string, changes: UpdateCustomerDto) {
    return this.customerModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.customerModel.findByIdAndDelete(id);
  }
}
