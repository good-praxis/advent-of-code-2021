import { Test, TestingModule } from '@nestjs/testing';
import { SyntaxService } from './syntax.service';
import { FileService } from '../file/file.service';

describe('SyntaxService', () => {
  let service: SyntaxService;

  const mockData = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

  const mockFileService = {
    getFile: jest.fn().mockReturnValue(mockData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SyntaxService,
        {
          provide: FileService,
          useValue: mockFileService,
        },
      ],
    }).compile();

    service = module.get<SyntaxService>(SyntaxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate a score of 26397', () => {
    expect(service.getScore()).toBe(26397);
  });

  it('should calculate the correct middle score of 288957', () => {
    expect(service.getCompletionScore()).toBe(288957);
  });

  it('should determine the missing brackets ])}>', () => {
    expect(service.findMissingBracket(`<{([{{}}[<[[[<>{}]]]>[]]`)).toBe('])}>');
  });

  it('calcMissingScore should calculate a score of 294 for ])}>', () => {
    expect(service.calcMissingScore('])}>')).toBe(294);
  });
});
