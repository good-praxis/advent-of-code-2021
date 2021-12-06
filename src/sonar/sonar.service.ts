import { Injectable } from '@nestjs/common';
import { FileService } from '../file/file.service';

@Injectable()
export class SonarService {
  constructor(private readonly fileService: FileService) {}
  getSonar(groupSize = 1): number {
    // get data, convert all non-empty lines to integers
    const data = this.fileService
      .getFile('input/sonar.txt')
      .split('\n')
      .filter((line) => line.length > 0)
      .map((line) => parseInt(line, 10));

    // calculate sliding window sum for each permutation of groupSize
    // skip last groupSize elements
    const groupData = data
      .map((value, index) => {
        if (index + groupSize > data.length) {
          return NaN;
        }
        return data.slice(index, index + groupSize).reduce((a, b) => a + b, 0);
      })
      .filter((value) => !isNaN(value));

    // compare each group with previous group,
    // if this value is greater than previous, return 'increased'
    // if this value is less than previous, return 'decreased'
    const compData = groupData.map((line, index) => {
      if (index === 0 || index > data.length - groupSize) {
        return 'N/A';
      }

      if (line > groupData[index - 1]) {
        return 'increased';
      } else {
        return 'decreased';
      }
    });

    return compData.filter((line) => line === 'increased').length;
  }
}
