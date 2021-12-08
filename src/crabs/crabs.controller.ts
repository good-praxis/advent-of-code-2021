import { Controller, Get } from '@nestjs/common';
import { CrabsService } from './crabs.service';

@Controller('crabs')
export class CrabsController {
  constructor(private readonly crabsService: CrabsService) {}

  @Get()
  getAlignmentFuelcost() {
    return this.crabsService.getAlignmentFuelcost();
  }

  @Get('/crabs')
  getCrabAlignmentFuelcost() {
    return this.crabsService.getCrabAlignmentFuelcost();
  }
}
