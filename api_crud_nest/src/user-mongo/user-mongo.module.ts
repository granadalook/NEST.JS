import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProducMongoModule } from '../produc-mongo/produc-mongo.module';
import { CustumersMongoController } from './controllers/custumers-mongo/custumers-mongo.controller';
import { OrdersMongoController } from './controllers/orders-mongo/orders-mongo.controller';
import { UsersMongoController } from './controllers/users-mongo/users-mongo.controller';
import { Customer, CustomerSchema } from './entities/custumerMongo.entity';
import { Order, OrderSchema } from './entities/orderMongo.entity';
import { User, UserSchema } from './entities/userMongo.entity';
import { CustomerMongoService } from './services/customer-mongo/customer-mongo.service';
import { OrderMongoService } from './services/order-mongo/order-mongo.service';
import { UserMongoService } from './services/user-mongo/user-mongo.service';

@Module({
  imports: [
    ProducMongoModule,
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [
    CustumersMongoController,
    UsersMongoController,
    OrdersMongoController,
  ],
  providers: [CustomerMongoService, OrderMongoService, UserMongoService],
  exports: [UserMongoService],
})
export class UserMongoModule {}
