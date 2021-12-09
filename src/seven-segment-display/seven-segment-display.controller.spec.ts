import { Test, TestingModule } from '@nestjs/testing';
import { SevenSegmentDisplayController } from './seven-segment-display.controller';
import { SevenSegmentDisplayService } from './seven-segment-display.service';

describe('SevenSegmentDisplayController', () => {
  let controller: SevenSegmentDisplayController;

  const mockSevenSegmentDisplayService = {
    getSevenSegmentDisplay1478: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SevenSegmentDisplayController],
      providers: [
        {
          provide: SevenSegmentDisplayService,
          useValue: mockSevenSegmentDisplayService,
        },
      ],
    }).compile();

    controller = module.get<SevenSegmentDisplayController>(
      SevenSegmentDisplayController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSevenSegmentDisplay1478', () => {
    it('should call SevenSegmentDisplayService.getSevenSegmentDisplay1478', () => {
      controller.getSevenSegmentDisplay1478();
      expect(
        mockSevenSegmentDisplayService.getSevenSegmentDisplay1478,
      ).toHaveBeenCalled();
    });
  });
});
