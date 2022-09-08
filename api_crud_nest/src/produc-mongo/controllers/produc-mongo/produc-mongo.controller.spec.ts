import { Test, TestingModule } from '@nestjs/testing';
import { ProducMongoController } from './produc-mongo.controller';

describe('ProducMongoController', () => {
  let controller: ProducMongoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducMongoController],
    }).compile();

    controller = module.get<ProducMongoController>(ProducMongoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
