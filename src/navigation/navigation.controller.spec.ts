import { Test, TestingModule } from '@nestjs/testing';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';

describe('NavigationController', () => {
  let controller: NavigationController;

  const mockNavigationService = {
    getNavigation: jest.fn(() => 0),

    getLegacyNavigation: jest.fn(() => 0),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NavigationController],
      providers: [
        { provide: NavigationService, useValue: mockNavigationService },
      ],
    }).compile();

    controller = module.get<NavigationController>(NavigationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call provider function on "/legacy request', () => {
    controller.getLegacyNavigation();
    expect(mockNavigationService.getLegacyNavigation).toHaveBeenCalled();
  });

  it('should call provider on "/" request', () => {
    controller.getNavigation();
    expect(mockNavigationService.getNavigation).toHaveBeenCalled();
  });
});
