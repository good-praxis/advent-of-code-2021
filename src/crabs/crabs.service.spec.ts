import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '../file/file.service';
import { CrabsService } from './crabs.service';

describe('CrabsService', () => {
  let service: CrabsService;

  const mockData = '16,1,2,0,4,2,7,1,2,14';

  const mockFileService = {
    getFile: jest.fn().mockReturnValue(mockData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrabsService,
        { provide: FileService, useValue: mockFileService },
      ],
    }).compile();

    service = module.get<CrabsService>(CrabsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should determine a fuel cost', () => {
    expect(service.getAlignmentFuelcost()).toBe(37);
  });

  it('should determine the right crab fuel cost', () => {
    expect(service.getCrabAlignmentFuelcost()).toBe(168);
  });
});
