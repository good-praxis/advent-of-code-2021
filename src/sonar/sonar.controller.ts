import { Controller, Get, Param } from '@nestjs/common';
import { SonarService } from './sonar.service';

@Controller('sonar')
export class SonarController {
  constructor(private readonly sonarService: SonarService) {}

  @Get()
  getSonar(): number {
    return this.sonarService.getSonar();
  }

  @Get('/:groupSize')
  getSonarGroup(@Param('groupSize') groupSize): number {
    return this.sonarService.getSonar(parseInt(groupSize));
  }
}
