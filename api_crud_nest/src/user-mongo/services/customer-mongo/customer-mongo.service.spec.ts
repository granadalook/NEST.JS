import { Test, TestingModule } from '@nestjs/testing';
import { CustomerMongoService } from './customer-mongo.service';

describe('CustomerMongoService', () => {
  let service: CustomerMongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerMongoService],
    }).compile();

    service = module.get<CustomerMongoService>(CustomerMongoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
