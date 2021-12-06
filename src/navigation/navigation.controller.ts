import { Controller, Get } from '@nestjs/common';
import { NavigationService } from './navigation.service';

@Controller('navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Get()
  getNavigation(): number {
    return this.navigationService.getNavigation();
  }

  @Get('/legacy')
  getLegacyNavigation(): number {
    return this.navigationService.getLegacyNavigation();
  }
}
