import { Injectable } from '@nestjs/common';
import { FileService } from '../file/file.service';

@Injectable()
export class SyntaxService {
  constructor(private readonly fileService: FileService) {}

  closingBracket = {
    '{': '}',
    '(': ')',
    '[': ']',
    '<': '>',
  };

  scoringTable = {
    '}': 1197,
    ')': 3,
    ']': 57,
    '>': 25137,
  };

  missingScoringTable = {
    '}': 3,
    ')': 1,
    ']': 2,
    '>': 4,
  };

  getScore(): number {
    const lines = this.getData();

    let score = 0;

    for (const line of lines) {
      const illegal = this.findIllegal(line);
      if (illegal) {
        score += this.scoringTable[illegal];
      }
    }

    return score;
  }

  getCompletionScore(): number {
    const lines = this.getData();

    const scores: number[] = [];

    for (const line of lines) {
      const missing = this.findMissingBracket(line);
      if (missing.length > 0) {
        scores.push(this.calcMissingScore(missing));
      }
    }
    scores.sort((a, b) => (a > b ? 1 : -1));
    return scores[parseInt(`${scores.length / 2}`)];
  }

  calcMissingScore(missing: string): number {
    let score = 0;
    for (const char of missing) {
      score *= 5;
      score += this.missingScoringTable[char];
    }

    return score;
  }

  findIllegal(line: string): string {
    const stack = [];
    for (const char of line) {
      if (this.closingBracket.hasOwnProperty(char)) {
        stack.push(char);
      } else if (this.closingBracket[stack[stack.length - 1]] === char) {
        stack.pop();
      } else {
        return char;
      }
    }
    return '';
  }

  findMissingBracket(line: string): string {
    const stack = [];
    for (const char of line) {
      if (this.closingBracket.hasOwnProperty(char)) {
        stack.push(this.closingBracket[char]);
      } else if (stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        return '';
      }
    }
    stack.reverse();
    return stack.join('');
  }

  getData(): string[] {
    return this.fileService.getFile('/input/syntax.txt').trim().split('\n');
  }
}
