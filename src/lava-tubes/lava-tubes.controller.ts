import { Controller, Get } from '@nestjs/common';
import { LavaTubesService } from './lava-tubes.service';

@Controller('lava-tubes')
export class LavaTubesController {
  constructor(private readonly lavaTubesService: LavaTubesService) {}

  @Get('/risk')
  getRisk() {
    return this.lavaTubesService.getRisk();
  }

  @Get('/basins')
  getBasins() {
    return this.lavaTubesService.getBasins();
  }
}
