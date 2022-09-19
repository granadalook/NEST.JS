import { Test, TestingModule } from '@nestjs/testing';
import { ApiNamesService } from './api-names.service';

describe('ApiNamesService', () => {
  let service: ApiNamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiNamesService],
    }).compile();

    service = module.get<ApiNamesService>(ApiNamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
