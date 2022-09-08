import { Test, TestingModule } from '@nestjs/testing';
import { OrdersMongoController } from './orders-mongo.controller';

describe('OrdersMongoController', () => {
  let controller: OrdersMongoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersMongoController],
    }).compile();

    controller = module.get<OrdersMongoController>(OrdersMongoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
