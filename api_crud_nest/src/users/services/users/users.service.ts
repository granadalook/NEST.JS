/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'pg';

import { User } from '../../entities/user.entity';
//import { Order } from '../../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto';

import { ProductService } from '../../../products/services/product/product.service';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
    private customersService: CustomersService,
  ) {}

  findAll() {
    return this.userRepo.find({ relations: ['customer'] });
  }

  async findOne(id: any) {
    const user = await this.userRepo.findOneBy(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    if (data.customerId) {
      //  aca validamos   que  viene la relacion
      const customer = await this.customersService.findOne(data.customerId); // con el servicio de customer   asignamos la data
      console.log('customer', customer);
      newUser.customer = customer;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
