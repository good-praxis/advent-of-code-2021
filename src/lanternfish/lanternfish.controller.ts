import { Controller, Get, Param } from '@nestjs/common';
import { LanternfishService } from './lanternfish.service';

@Controller('lanternfish')
export class LanternfishController {
  constructor(private readonly lanternfishService: LanternfishService) {}

  @Get()
  getSimulationResult() {
    return this.lanternfishService.getSimulationResult(80);
  }

  @Get('/:cycles')
  getSimulationResultWithCycles(@Param('cycles') cycles: string) {
    return this.lanternfishService.getSimulationResult(parseInt(cycles));
  }
}
