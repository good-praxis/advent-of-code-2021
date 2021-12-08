import { Test, TestingModule } from '@nestjs/testing';
import { HydrothermicVentController } from './hydrothermic-vent.controller';
import { HydrothermicVentService } from './hydrothermic-vent.service';

describe('HydrothermicVentController', () => {
  let controller: HydrothermicVentController;

  const mockHydrothermicVentService = {
    getAmountOfEasyHotSpots: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HydrothermicVentController],
      providers: [
        {
          provide: HydrothermicVentService,
          useValue: mockHydrothermicVentService,
        },
      ],
    }).compile();

    controller = module.get<HydrothermicVentController>(
      HydrothermicVentController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getAmountOfEasyHotspots for level1', () => {
    controller.getLevel1();
    expect(
      mockHydrothermicVentService.getAmountOfEasyHotSpots,
    ).toHaveBeenCalled();
  });
});
