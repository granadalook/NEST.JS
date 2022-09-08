import { Test, TestingModule } from '@nestjs/testing';
import { BrandMongoController } from './brand-mongo.controller';

describe('BrandMongoController', () => {
  let controller: BrandMongoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandMongoController],
    }).compile();

    controller = module.get<BrandMongoController>(BrandMongoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
