import { Injectable } from '@nestjs/common';
import { FileService } from '../file/file.service';

@Injectable()
export class HydrothermicVentService {
  constructor(private readonly fileService: FileService) {}

  getAmountOfEasyHotSpots(): number {
    const data = this.processData();

    // filter data for easy vent lines (non-diagonal)
    const easyVents = data.filter(
      (vent) => vent[0][0] === vent[1][0] || vent[0][1] === vent[1][1],
    );

    // walk from beginning of each easy vent to the end, adding the positions to the array of the vent
    const fullVents = easyVents.map((vent) => {
      const fullVent = [];
      let currentPosition = vent[0];
      fullVent.push(currentPosition);
      while (currentPosition.toString() !== vent[1].toString()) {
        currentPosition = this.getNextPosition(currentPosition, vent);
        fullVent.push(currentPosition);
      }
      return fullVent;
    });

    // create a map of positions, count the number of times each position appears
    const positionMap: number[][] = fullVents.flat().reduce((map, [x, y]) => {
      map[x] = map[x] || [];
      map[x][y] = map[x][y] || 0;
      map[x][y] += 1;

      return map;
    }, []);

    return positionMap.flat().filter((value) => value > 1).length;
  }

  getAmountOfHardHotSpots(): number {
    const data = this.processData();

    // walk from beginning of each easy vent to the end, adding the positions to the array of the vent
    const fullVents = data.map((vent) => {
      const fullVent = [];
      let currentPosition = vent[0];
      fullVent.push(currentPosition);
      while (currentPosition.toString() !== vent[1].toString()) {
        currentPosition = this.getNextPosition(currentPosition, vent);
        fullVent.push(currentPosition);
      }
      return fullVent;
    });

    // create a map of positions, count the number of times each position appears
    const positionMap: number[][] = fullVents.flat().reduce((map, [x, y]) => {
      map[x] = map[x] || [];
      map[x][y] = map[x][y] || 0;
      map[x][y] += 1;

      return map;
    }, []);

    return positionMap.flat().filter((value) => value > 1).length;
  }

  getNextPosition(currentPosition: number[], vent: number[][]) {
    // We assume that we are always moving towards vent[1]

    const xDiff = vent[1][0] - currentPosition[0];
    const yDiff = vent[1][1] - currentPosition[1];
    const xDir = Math.max(Math.min(xDiff, 1), -1);
    const yDir = Math.max(Math.min(yDiff, 1), -1);
    return [currentPosition[0] + xDir, currentPosition[1] + yDir];
  }

  processData() {
    // get data from file, split into lines, split lines by -> into positions, split positions by , into values
    const input = this.fileService.getFile('/input/hydrothermic-vent.txt');
    return input
      .split('\n')
      .filter((line) => line !== '')
      .map((vent) =>
        vent
          .split('->')
          .map((position) =>
            position.split(',').map((value) => parseInt(value, 10)),
          ),
      );
  }
}
