import { Test, TestingModule } from '@nestjs/testing';
import { CategoryMongoController } from './category-mongo.controller';

describe('CategoryMongoController', () => {
  let controller: CategoryMongoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryMongoController],
    }).compile();

    controller = module.get<CategoryMongoController>(CategoryMongoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
