import { Test, TestingModule } from '@nestjs/testing';
import { UsersMongoController } from './users-mongo.controller';

describe('UsersMongoController', () => {
  let controller: UsersMongoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersMongoController],
    }).compile();

    controller = module.get<UsersMongoController>(UsersMongoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
