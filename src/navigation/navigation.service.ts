import { Injectable } from '@nestjs/common';
import { FileService } from '../file/file.service';

@Injectable()
export class NavigationService {
  constructor(private readonly fileService: FileService) {}

  getNavigation(): number {
    let depth = 0;
    let horizontalPosition = 0;
    let aim = 0;

    const instructions = this.getInstructions();

    // for any down instruction, add to aim
    // for any up instruction, subtract from aim
    // for any forward instruction, add to horizontal position
    // and increase depth by aim times X
    instructions.forEach((instruction: [string, number]) => {
      switch (instruction[0]) {
        case 'down':
          aim += instruction[1];
          break;
        case 'up':
          aim -= instruction[1];
          break;
        case 'forward':
          horizontalPosition += instruction[1];
          depth += aim * instruction[1];
          break;
      }
    });

    // return horizontal position times depth
    return horizontalPosition * depth;
  }

  getLegacyNavigation(): number {
    let depth = 0;
    let horizontalPosition = 0;

    const instructions = this.getInstructions();

    // for any forward instruction, add to horizontal position
    // for any down instruction, add to depth
    // for any up instruction, subtract from depth
    instructions.forEach((instruction: [string, number]) => {
      switch (instruction[0]) {
        case 'forward':
          horizontalPosition += instruction[1];
          break;
        case 'down':
          depth += instruction[1];
          break;
        case 'up':
          depth -= instruction[1];
          break;
      }
    });

    // return horizontal position * depth
    return horizontalPosition * depth;
  }

  // Get data from file, split by newline, split lines by space, parse index 1 as number
  getInstructions() {
    return this.fileService
      .getFile('/input/navigation.txt')
      .split('\n')
      .map((line) => line.split(' '))
      .map((instruction) => [instruction[0], parseInt(instruction[1], 10)]);
  }
}
