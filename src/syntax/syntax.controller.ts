import { Controller, Get } from '@nestjs/common';
import { SyntaxService } from './syntax.service';

@Controller('syntax')
export class SyntaxController {
  constructor(private readonly syntaxService: SyntaxService) {}

  @Get('/score')
  getScore() {
    return this.syntaxService.getScore();
  }

  @Get('/missing')
  getMissing() {
    return this.syntaxService.getCompletionScore();
  }
}
