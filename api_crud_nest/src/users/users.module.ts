import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from '../users/controllers/orders/orders.controller';

import { ProductsModule } from '../products/products.module';
import { CustomerController } from './controllers/customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';
import { Customer } from './entities/customer.entity';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { User } from './entities/user.entity';
import { CustomersService } from './services/customers/customers.service';
import { OrdersService } from './services/orders/orders.service';
import { UsersService } from './services/users/users.service';
import { OrderItemController } from './controllers/order-item/order-item.controller';
import { OrderItemService } from './services/order-item/order-item.service';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem]), // entidades
  ], // importamos otro modulo para usar su servicio
  controllers: [
    CustomerController,
    UsersController,
    OrdersController,
    OrderItemController,
  ], // controladores
  providers: [CustomersService, UsersService, OrdersService, OrderItemService], // servicios
  exports: [UsersService], //  exportamos user service para  ser utilizado en otros modulos
})
export class UsersModule {}
