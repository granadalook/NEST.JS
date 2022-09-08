import { Test, TestingModule } from '@nestjs/testing';
import { CategorysMongoService } from './categorys-mongo.service';

describe('CategorysMongoService', () => {
  let service: CategorysMongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategorysMongoService],
    }).compile();

    service = module.get<CategorysMongoService>(CategorysMongoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
