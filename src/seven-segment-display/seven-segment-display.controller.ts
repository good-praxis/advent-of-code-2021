import { Controller, Get } from '@nestjs/common';
import { SevenSegmentDisplayService } from './seven-segment-display.service';

@Controller('seven-segment-display')
export class SevenSegmentDisplayController {
  constructor(
    private readonly sevenSegmentDisplayService: SevenSegmentDisplayService,
  ) {}

  @Get('/1478')
  getSevenSegmentDisplay1478(): number {
    return this.sevenSegmentDisplayService.getSevenSegmentDisplay1478();
  }

  @Get()
  getSumOfReadings(): number {
    return this.sevenSegmentDisplayService.getSumOfReadings();
  }
}
