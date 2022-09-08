import { Test, TestingModule } from '@nestjs/testing';
import { CustumersMongoController } from './custumers-mongo.controller';

describe('CustumersMongoController', () => {
  let controller: CustumersMongoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustumersMongoController],
    }).compile();

    controller = module.get<CustumersMongoController>(CustumersMongoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
