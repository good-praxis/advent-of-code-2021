import { Test, TestingModule } from '@nestjs/testing';
import { SyntaxController } from './syntax.controller';
import { SyntaxService } from './syntax.service';

describe('SyntaxController', () => {
  let controller: SyntaxController;

  const mockSyntaxService = {
    getScore: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SyntaxController],
      providers: [
        {
          provide: SyntaxService,
          useValue: mockSyntaxService,
        },
      ],
    }).compile();

    controller = module.get<SyntaxController>(SyntaxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the expected functions', () => {
    controller.getScore();
    expect(mockSyntaxService.getScore).toHaveBeenCalled();
  });
});
