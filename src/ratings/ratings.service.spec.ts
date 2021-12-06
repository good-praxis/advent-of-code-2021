import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '../file/file.service';
import { RatingsService } from './ratings.service';

describe('RatingsService', () => {
  let service: RatingsService;

  const mockData =
    '00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010\n';

  const mockFileService = {
    getFile: jest.fn().mockReturnValue(mockData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingsService,
        { provide: FileService, useValue: mockFileService },
      ],
    }).compile();

    service = module.get<RatingsService>(RatingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a power consumption rating of 198', () => {
    expect(service.getPowerConsumptionRating()).toBe(198);
  });

  it('should return a life support rating of 230', () => {
    expect(service.getLifeSupportRating()).toBe(230);
  });

  it('should return a gamma rate of [1, 0, 1, 1, 0]', () => {
    expect(service.getGammaRate(service.getDiagnosticReport())).toStrictEqual([
      1, 0, 1, 1, 0,
    ]);
  });

  it('should return an oxygen generator rating of [1, 0, 1, 1, 1]', () => {
    expect(
      service.getOxygenGeneratorRating(service.getDiagnosticReport()),
    ).toStrictEqual([1, 0, 1, 1, 1]);
  });

  it('should return a co2 scrubber rating of [0, 1, 0, 1, 0]', () => {
    expect(
      service.getCO2ScrubberRating(service.getDiagnosticReport()),
    ).toStrictEqual([0, 1, 0, 1, 0]);
  });
});
