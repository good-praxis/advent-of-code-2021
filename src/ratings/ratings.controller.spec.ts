import { Test, TestingModule } from '@nestjs/testing';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';

describe('RatingsController', () => {
  let controller: RatingsController;

  const mockRatingsService = {
    getPowerConsumptionRating: jest.fn(),
    getLifeSupportRating: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingsController],
      providers: [{ provide: RatingsService, useValue: mockRatingsService }],
    }).compile();

    controller = module.get<RatingsController>(RatingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call providers getPowerConsumptionRating at "/ratings/power"', () => {
    controller.getPowerConsumptionRating();
    expect(mockRatingsService.getPowerConsumptionRating).toHaveBeenCalled();
  });

  it('should call the providers getLifeSupportRating on "/ratings/lifesupport"', () => {
    controller.getLifeSupportRating();
    expect(mockRatingsService.getLifeSupportRating).toHaveBeenCalled();
  });
});
