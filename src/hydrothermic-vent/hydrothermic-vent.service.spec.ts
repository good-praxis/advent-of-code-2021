import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '../file/file.service';
import { HydrothermicVentService } from './hydrothermic-vent.service';

describe('HydrothermicVentService', () => {
  let service: HydrothermicVentService;

  const mockData = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

  const mockFileService = {
    getFile: jest.fn().mockReturnValue(mockData),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HydrothermicVentService,
        { provide: FileService, useValue: mockFileService },
      ],
    }).compile();

    service = module.get<HydrothermicVentService>(HydrothermicVentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process the test data', () => {
    const expectedResult = [
      [
        [0, 9],
        [5, 9],
      ],
      [
        [8, 0],
        [0, 8],
      ],
      [
        [9, 4],
        [3, 4],
      ],
      [
        [2, 2],
        [2, 1],
      ],
      [
        [7, 0],
        [7, 4],
      ],
      [
        [6, 4],
        [2, 0],
      ],
      [
        [0, 9],
        [2, 9],
      ],
      [
        [3, 4],
        [1, 4],
      ],
      [
        [0, 0],
        [8, 8],
      ],
      [
        [5, 5],
        [8, 2],
      ],
    ];

    expect(service.processData()).toStrictEqual(expectedResult);
  });

  it('should detect 5 hot spots through getAmountOfEasyHotSpots', () => {
    expect(service.getAmountOfEasyHotSpots()).toBe(5);
  });

  it('should detect 12 hotspots when considering diagonals as well', () => {
    expect(service.getAmountOfHardHotSpots()).toBe(12);
  });
});
