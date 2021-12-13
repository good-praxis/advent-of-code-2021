import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '../file/file.service';
import { LavaTubesService } from './lava-tubes.service';

describe('LavaTubesService', () => {
  let service: LavaTubesService;

  const mockData = `2199943210
3987894921
9856789892
8767896789
9899965678`;

  const mockFileService = {
    getFile: jest.fn().mockReturnValue(mockData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LavaTubesService,
        { provide: FileService, useValue: mockFileService },
      ],
    }).compile();

    service = module.get<LavaTubesService>(LavaTubesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should determine a risk factor of 15', () => {
    const result = service.getRisk();
    expect(result).toBe(15);
  });

  it('should produce the product of 1134 for the basins', () => {
    expect(service.getBasins()).toBe(1134);
  });
});
