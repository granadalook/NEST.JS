import { Module } from '@nestjs/common';

import { ProductsModule } from '../products/products.module';
import { CustomerController } from './controllers/customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';
import { CustomersService } from './services/customers/customers.service';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [ProductsModule], // importamos otro modulo para usar su servicio
  controllers: [CustomerController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
