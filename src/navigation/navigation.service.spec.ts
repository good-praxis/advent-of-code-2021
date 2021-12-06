import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '../file/file.service';
import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;

  const mockData = `forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2\n`;

  const mockFileService = {
    getFile: jest.fn().mockReturnValue(mockData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NavigationService,
        { provide: FileService, useValue: mockFileService },
      ],
    }).compile();

    service = module.get<NavigationService>(NavigationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return 150 with the mock data on the legacy navigation algorithm', () => {
    expect(service.getLegacyNavigation()).toBe(150);
  });

  it('should return 900 when using the proper algorithm', () => {
    expect(service.getNavigation()).toBe(900);
  });
});
