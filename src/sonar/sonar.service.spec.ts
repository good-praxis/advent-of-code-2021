import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '../file/file.service';
import { SonarService } from './sonar.service';

describe('SonarService', () => {
  let service: SonarService;

  const mockData = `199\n200\n208\n210\n200\n207\n240\n269\n260\n263\n`;

  const mockFileService = {
    getFile: jest.fn(() => mockData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SonarService,
        { provide: FileService, useValue: mockFileService },
      ],
    }).compile();

    service = module.get<SonarService>(SonarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call the fileservice', async () => {
    await service.getSonar();
    expect(mockFileService.getFile).toHaveBeenCalled();
  });

  it('should return 7 for the mock data', async () => {
    const result = await service.getSonar();
    expect(result).toBe(7);
  });

  it('should return 5 if used with a groupSize of 3', async () => {
    const result = await service.getSonar(3);
    expect(result).toBe(5);
  });
});
