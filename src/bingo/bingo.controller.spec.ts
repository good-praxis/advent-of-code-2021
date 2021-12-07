import { Test, TestingModule } from '@nestjs/testing';
import { BingoController } from './bingo.controller';
import { BingoService } from './bingo.service';

describe('BingoController', () => {
  let controller: BingoController;

  const mockBingoService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BingoController],
      providers: [{ provide: BingoService, useValue: mockBingoService }],
    }).compile();

    controller = module.get<BingoController>(BingoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
