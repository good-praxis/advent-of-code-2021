import { Test, TestingModule } from '@nestjs/testing';
import { CrabsController } from './crabs.controller';
import { CrabsService } from './crabs.service';

describe('CrabsController', () => {
  let controller: CrabsController;

  const mockCrabsService = {
    getAlignmentFuelcost: jest.fn(),
    getCrabAlignmentFuelcost: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrabsController],
      providers: [{ provide: CrabsService, useValue: mockCrabsService }],
    }).compile();

    controller = module.get<CrabsController>(CrabsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service function', () => {
    controller.getAlignmentFuelcost();
    expect(mockCrabsService.getAlignmentFuelcost).toHaveBeenCalled();
  });

  it('should call the crab alignment fuel cost function', () => {
    controller.getCrabAlignmentFuelcost();
    expect(mockCrabsService.getCrabAlignmentFuelcost).toHaveBeenCalled();
  });
});
