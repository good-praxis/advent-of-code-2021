import { Injectable } from '@nestjs/common';
import { FileService } from '../file/file.service';

@Injectable()
export class SevenSegmentDisplayService {
  constructor(private readonly fileService: FileService) {}

  // unique lengths of the signal
  ONE = 2;
  FOUR = 4;
  SEVEN = 3;
  EIGHT = 7;

  getSevenSegmentDisplay1478(): number {
    // due to the unique signatures of 1, 4, 7, and 8,
    // we can count their occurences through the length of the signal
    // and return the sum of the occurences of 1, 4, 7, and 8

    // the data structure is set: [sample, signal]
    // get data, filter for signals (we can ignore the samples for now), flatten,
    // then map to the length of the signal, then reduce to the sum
    const data = this.getData();

    const signals = data.map((set) => set[1].map((signal) => signal.length));
    const count = signals.flat().reduce((acc, curr) => {
      const expected = [2, 3, 4, 7];
      if (expected.includes(curr)) {
        acc++;
      }
      return acc;
    }, 0);

    return count;
  }

  getSumOfReadings(): number {
    // now we have to figure out which sample pattern relates to which number,
    // focusing on the readings in the signal. Note that all readings are scrambled

    const data = this.getData().map(([sample, signal]) => {
      sample = sample.map((pattern) => {
        const sorted = [...pattern].sort();
        return sorted.join('');
      });

      signal = signal.map((pattern) => {
        const sorted = [...pattern].sort();
        return sorted.join('');
      });

      return [sample, signal];
    });

    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const [sample, signal] = data[i];
      sum += this.determineNumbers(signal, sample);
    }

    return sum;
  }

  determineNumbers(signal: string[], sample: string[]): number {
    const one = sample.find((pattern) => pattern.length === this.ONE);
    const four = sample.find((pattern) => pattern.length === this.FOUR);
    const seven = sample.find((pattern) => pattern.length === this.SEVEN);
    const eight = sample.find((pattern) => pattern.length === this.EIGHT);

    sample = sample.filter(
      (pattern) => ![one, four, seven, eight].includes(pattern),
    );

    // three includes all of one, but we need to check one character at a time
    const three = sample.find((pattern) => {
      return (
        pattern.length === 5 && [...one].every((char) => pattern.includes(char))
      );
    });
    sample = sample.filter((pattern) => three !== pattern);

    // five includes 3 parts of 4
    const five = sample.find((pattern) => {
      if (pattern.length === 5) {
        let count = 0;
        for (let i = 0; i < pattern.length; i++) {
          if (four.includes(pattern[i])) {
            count++;
          }
        }
        return count === 3;
      }
    });
    sample = sample.filter((pattern) => five !== pattern);
    const two = sample.find((pattern) => pattern.length === 5);
    sample = sample.filter((pattern) => two !== pattern);

    // nine includes all of three
    const nine = sample.find((pattern) => {
      return [...three].every((char) => pattern.includes(char));
    });
    sample = sample.filter((pattern) => nine !== pattern);

    const six = sample.find((pattern) => {
      return [...five].every((char) => pattern.includes(char));
    });

    const zero = sample.find((pattern) => pattern !== six);

    const fixedSignal = signal.map((pattern) => {
      switch (pattern) {
        case one:
          return '1';
          break;
        case two:
          return '2';
          break;
        case three:
          return '3';
          break;
        case four:
          return '4';
          break;
        case five:
          return '5';
          break;
        case six:
          return '6';
          break;
        case seven:
          return '7';
          break;
        case eight:
          return '8';
          break;
        case nine:
          return '9';
          break;
        case zero:
          return '0';
          break;
      }
    });

    return parseInt(fixedSignal.join(''), 10);
  }

  getData(): string[][][] {
    // load data from file, split it by newline,
    // split it by delimiter |, split it by space, filter out empty lines,
    const data = this.fileService
      .getFile('/input/seven-segment-display.txt')
      .trim()
      .split('\n')
      .map((set) => set.split('|').map((output) => output.trim().split(' ')));

    return data;
  }
}
