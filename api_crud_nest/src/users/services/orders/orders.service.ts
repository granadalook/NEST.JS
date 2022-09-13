import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../../dtos/order.dto';
import { Customer } from '../../entities/customer.entity';
import { Order } from '../../entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: {
        id,
      },
      relations: {
        items: {
          product: true,
        },
      },
    });
    if (!order) {
      throw new NotFoundException('ORDEN NO EXISTE');
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    if (data.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: data.customerId },
      });
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (changes.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: changes.customerId },
      });
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async remove(id: number) {
    const orderDelete = await this.findOne(id);
    if (!orderDelete) {
      throw new NotFoundException(`ORDEN DE ID ${id} NO EXIXTE`);
    }
    this.orderRepo.delete(id);
    return {
      message: 'ORDEN ELIMINADA',
      orderDelete,
    };
  }
}
