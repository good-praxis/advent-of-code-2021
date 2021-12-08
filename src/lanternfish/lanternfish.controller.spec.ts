import { Test, TestingModule } from '@nestjs/testing';
import { LanternfishController } from './lanternfish.controller';
import { LanternfishService } from './lanternfish.service';

describe('LanternfishController', () => {
  let controller: LanternfishController;

  const mockLanternfishService = {
    getSimulationResult: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LanternfishController],
      providers: [
        { provide: LanternfishService, useValue: mockLanternfishService },
      ],
    }).compile();

    controller = module.get<LanternfishController>(LanternfishController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getSimlationResult', () => {
    controller.getSimulationResult();
    expect(mockLanternfishService.getSimulationResult).toHaveBeenCalled();
  });

  it('should use a default argument of 80', () => {
    controller.getSimulationResult();
    expect(mockLanternfishService.getSimulationResult).toHaveBeenCalledWith(80);
  });

  it('should pass the amount of cycles to the provider function', () => {
    controller.getSimulationResultWithCycles('100');
    expect(mockLanternfishService.getSimulationResult).toHaveBeenCalledWith(
      100,
    );
  });
});
