import { Injectable } from '@nestjs/common';
import { FileService } from '../file/file.service';

@Injectable()
export class LanternfishService {
  constructor(private readonly fileService: FileService) {}

  getSimulationResult(cycles = 80): bigint {
    let population = this.fileService
      .getFile('/input/lanternfish.txt')
      .split(',')
      .map(Number);

    if (cycles < 5) {
      for (let i = 0; i < cycles; i++) {
        population = this.getNextDay(population);
      }
      return BigInt(population.length);
    }
    return this.runSimulation(cycles, population);
  }

  getNextDay(population: number[]) {
    const tail = [];
    const head = population.map((fish) => {
      if (fish === 0) {
        tail.push(8);
        return 6;
      } else {
        return fish - 1;
      }
    });

    return [...head, ...tail];
  }

  runSimulation(cycles = 80, initialPopulation: number[]): bigint {
    let pop = BigInt(initialPopulation.length);
    const development: bigint[] = new Array(9).fill(BigInt(0));
    initialPopulation.forEach((fish) => {
      development[fish] += BigInt(1);
    });

    for (let i = 0; i < cycles; i++) {
      const today = development.shift();
      pop = pop + today;
      development[8] = today;
      development[6] = development[6] + today;
    }

    return pop;
  }
}
