import { Controller, Get } from '@nestjs/common';
import { BingoService } from './bingo.service';

@Controller('bingo')
export class BingoController {
  constructor(private readonly bingoService: BingoService) {}

  @Get('/win')
  getWinningScore(): number {
    return this.bingoService.getWinningScore();
  }

  @Get('/lose')
  getLosingScore(): number {
    return this.bingoService.getLosingScore();
  }
}
