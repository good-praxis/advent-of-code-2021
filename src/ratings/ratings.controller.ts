import { Controller, Get } from '@nestjs/common';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get('/power')
  getPowerConsumptionRating(): number {
    return this.ratingsService.getPowerConsumptionRating();
  }

  @Get('/lifesupport')
  getLifeSupportRating(): number {
    return this.ratingsService.getLifeSupportRating();
  }
}
