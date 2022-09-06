import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from '../products/products.module';
import { CustomerController } from './controllers/customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';
import { Customer } from './entities/customer.entity';
import { User } from './entities/user.entity';
import { CustomersService } from './services/customers/customers.service';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer])], // importamos otro modulo para usar su servicio
  controllers: [CustomerController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
