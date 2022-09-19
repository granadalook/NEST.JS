import { Test, TestingModule } from '@nestjs/testing';
import { ApinamesController } from './apinames.controller';

describe('ApinamesController', () => {
  let controller: ApinamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApinamesController],
    }).compile();

    controller = module.get<ApinamesController>(ApinamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
