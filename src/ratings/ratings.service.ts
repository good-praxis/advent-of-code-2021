import { Injectable } from '@nestjs/common';
import { FileService } from '../file/file.service';

@Injectable()
export class RatingsService {
  constructor(private readonly fileService: FileService) {}

  getPowerConsumptionRating(): number {
    const report = this.getDiagnosticReport();

    // for each value in report, each position in value
    // figure out the most common value for that position
    // if there is a tie, default to 1
    const gamma = this.getGammaRate(report);

    const epsilon = this.getEpsilonRate(report);

    // parse gamma and epsilon, then return their product
    return parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2);
  }

  // the gamma rate is composed of the most common bits per position in the report
  getGammaRate(report: number[][]): number[] {
    const count = this.countBitsByPosition(report);

    // gamma is the most common value for each position
    return count.map(([zero, one]) => (one > zero ? 1 : 0));
  }

  countBitsByPosition(report: number[][]): number[][] {
    const count = report[0].map(() => [0, 0]);

    // for each position in the report (each column) count the number of 1s and 0s
    report.forEach((line) => {
      line.forEach((value, index) => {
        count[index][value]++;
      });
    });
    return count;
  }

  // the epislon rate is composed of the least common bits per position in the report
  // therefore the bitflipped gamma is epsilon
  getEpsilonRate(report: number[][]): number[] {
    return this.getGammaRate(report).map((value) => (value === 1 ? 0 : 1));
  }

  getLifeSupportRating(): number {
    const report = this.getDiagnosticReport();

    const oxygenRating = this.getOxygenGeneratorRating(report);
    const co2Rating = this.getCO2ScrubberRating(report);

    // return the product of the oxygen generator and co2 scrubber ratings
    return parseInt(oxygenRating.join(''), 2) * parseInt(co2Rating.join(''), 2);
  }

  // The oxygen generator rating is derived by filtering the diagnostic report
  // for one bit at a time, by maximum used bit, until only one value remains. In the case of a tie,
  // 1 is preferred.
  getOxygenGeneratorRating(report: number[][]): number[] {
    let oxygenGeneratorRating: number[];
    let filteredReport = report;

    // for each bit in the report, filter the report for the most common bit of that position
    // if there is a tie, default to 1
    for (let i = 0; i < report[0].length; i++) {
      const counts = this.countBitsByPosition(filteredReport);
      filteredReport = filteredReport.filter(
        (line) => line[i] === (counts[i][0] > counts[i][1] ? 0 : 1),
      );
      if (filteredReport.length === 1) {
        oxygenGeneratorRating = filteredReport[0];
        break;
      }
    }

    return oxygenGeneratorRating;
  }

  // The co2 scrubber rating is derived by filtering the diagnostic report
  // for one bit at a time, by least used bit, until only one value remains. In the case of a tie,
  // 0 is preferred.
  getCO2ScrubberRating(report: number[][]): number[] {
    let co2ScrubberRating: number[];
    let filteredReport = report;

    // for each bit in the report, filter the report for the least common bit of that position
    // if there is a tie, default to 0
    for (let i = 0; i < report[0].length; i++) {
      const counts = this.countBitsByPosition(filteredReport);
      filteredReport = filteredReport.filter(
        (line) => line[i] === (counts[i][1] >= counts[i][0] ? 0 : 1),
      );
      if (filteredReport.length === 1) {
        co2ScrubberRating = filteredReport[0];
        break;
      }
    }

    return co2ScrubberRating;
  }

  // Nested Array of binary number
  getDiagnosticReport(): number[][] {
    return this.fileService
      .getFile('/input/ratings.txt')
      .split('\n')
      .filter((line) => line.length > 0)
      .map((line) => line.split(''))
      .map((line) => line.map((char) => parseInt(char, 2)));
  }
}
