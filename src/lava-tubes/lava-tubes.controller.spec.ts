import { Test, TestingModule } from '@nestjs/testing';
import { LavaTubesController } from './lava-tubes.controller';
import { LavaTubesService } from './lava-tubes.service';

describe('LavaTubesController', () => {
  let controller: LavaTubesController;

  const mockLavaTubesService = {
    getRisk: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LavaTubesController],
      providers: [
        { provide: LavaTubesService, useValue: mockLavaTubesService },
      ],
    }).compile();

    controller = module.get<LavaTubesController>(LavaTubesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getRisk', () => {
    controller.getRisk();
    expect(mockLavaTubesService.getRisk).toHaveBeenCalled();
  });
});
