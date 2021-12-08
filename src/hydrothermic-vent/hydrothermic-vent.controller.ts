import { Controller, Get } from '@nestjs/common';
import { HydrothermicVentService } from './hydrothermic-vent.service';

@Controller('hydrothermic-vent')
export class HydrothermicVentController {
  constructor(
    private readonly hydrothermicVentService: HydrothermicVentService,
  ) {}
  @Get('/level1')
  getLevel1() {
    return this.hydrothermicVentService.getAmountOfEasyHotSpots();
  }

  @Get('/level2')
  getLevel2() {
    return this.hydrothermicVentService.getAmountOfHardHotSpots();
  }
}
