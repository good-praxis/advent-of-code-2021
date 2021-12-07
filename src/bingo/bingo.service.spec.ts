import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '../file/file.service';
import { BingoService } from './bingo.service';

describe('BingoService', () => {
  let service: BingoService;

  const mockData = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;

  const mockFileService = {
    getFile: jest.fn().mockReturnValue(mockData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BingoService,
        { provide: FileService, useValue: mockFileService },
      ],
    }).compile();

    service = module.get<BingoService>(BingoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a winning score of 4512', () => {
    expect(service.getWinningScore()).toBe(4512);
  });

  it('should return a losing score of 1924', () => {
    expect(service.getLosingScore()).toBe(1924);
  });
});
