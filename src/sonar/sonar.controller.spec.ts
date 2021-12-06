import { Test, TestingModule } from '@nestjs/testing';
import { SonarController } from './sonar.controller';
import { SonarService } from './sonar.service';

describe('SonarController', () => {
  let controller: SonarController;

  const mockSonarService = {
    getSonar: jest.fn(() => 0),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SonarController],
      providers: [{ provide: SonarService, useValue: mockSonarService }],
    }).compile();

    controller = module.get<SonarController>(SonarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getSonar on provider', () => {
    controller.getSonar();
    expect(mockSonarService.getSonar).toHaveBeenCalled();
  });

  it('should call getSonar on the provider, if group param is used', () => {
    controller.getSonarGroup(1);
    expect(mockSonarService.getSonar).toHaveBeenCalled();
  });
});
