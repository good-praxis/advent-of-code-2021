import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '../file/file.service';
import { LanternfishService } from './lanternfish.service';

describe('LanternfishService', () => {
  let service: LanternfishService;

  const mockData = '3,4,3,1,2';

  const mockFileService = {
    getFile: jest.fn().mockReturnValue(mockData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LanternfishService,
        { provide: FileService, useValue: mockFileService },
      ],
    }).compile();

    service = module.get<LanternfishService>(LanternfishService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return 5934 for the example data', () => {
    expect(service.getSimulationResult()).toBe(BigInt(5934));
  });

  it('should return 26984457539 after 256 cycles', () => {
    expect(service.getSimulationResult(256)).toBe(BigInt(26984457539));
  });
});
