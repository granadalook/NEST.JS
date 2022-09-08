import { Test, TestingModule } from '@nestjs/testing';
import { BrandsMongoService } from './brands-mongo.service';

describe('BrandsMongoService', () => {
  let service: BrandsMongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandsMongoService],
    }).compile();

    service = module.get<BrandsMongoService>(BrandsMongoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
