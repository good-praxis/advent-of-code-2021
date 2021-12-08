import { Injectable } from '@nestjs/common';
import { toArray } from 'rxjs';
import { FileService } from '../file/file.service';

@Injectable()
export class CrabsService {
  constructor(private readonly fileService: FileService) {}

  getAlignmentFuelcost(): number {
    const data = this.fileService
      .getFile('/input/crabs.txt')
      .trim()
      .split(',')
      .map(Number);

    const max = Math.max(...data);
    const min = Math.min(...data);

    const range = this.range(min, max);

    let fuelCost = Number.MAX_VALUE;

    for (const i of range) {
      const iterFuelCost = data.reduce((acc, curr) => {
        acc = acc + Math.abs(curr - i);
        return acc;
      }, 0);

      fuelCost = Math.min(fuelCost, iterFuelCost);
    }

    return fuelCost;
  }

  getCrabAlignmentFuelcost(): number {
    const data = this.fileService
      .getFile('/input/crabs.txt')
      .trim()
      .split(',')
      .map(Number);

    const max = Math.max(...data);
    const min = Math.min(...data);

    const range = this.range(min, max);

    let fuelCost = Number.MAX_VALUE;

    for (const i of range) {
      const iterFuelCost = data.reduce((acc, curr) => {
        const generator = this.range(1, Math.abs(curr - i));
        return acc + this.sum(generator);
      }, 0);

      fuelCost = Math.min(fuelCost, iterFuelCost);
    }

    return fuelCost;
  }

  *range(start, end) {
    for (let i = start; i <= end; i++) {
      yield i;
    }
  }

  sum(n: Generator<number>) {
    let sum = 0;
    for (const i of n) {
      sum += i;
    }
    return sum;
  }
}
