import { Injectable } from '@nestjs/common';
import { mapTo } from 'rxjs';
import { FileService } from '../file/file.service';

@Injectable()
export class LavaTubesService {
  constructor(private readonly fileService: FileService) {}

  getRisk(): number {
    const map = this.getMap();
    const lowSpots = new Array<number[]>();
    map.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (this.determineLowSpot(cell, x, y, map)) lowSpots.push([x, y]);
      });
    });

    return lowSpots.reduce((acc, [x, y]) => {
      return acc + map[y][x] + 1;
    }, 0);

    return 0;
  }

  determineLowSpot(
    cell: number,
    x: number,
    y: number,
    map: number[][],
  ): boolean {
    let isLowSpot = true; // assume it is a low spot

    if (x > 0) {
      isLowSpot = isLowSpot && map[y][x - 1] > cell;
    }
    if (y > 0) {
      isLowSpot = isLowSpot && map[y - 1][x] > cell;
    }

    if (x < map[0].length - 1) {
      isLowSpot = isLowSpot && map[y][x + 1] > cell;
    }

    if (y < map.length - 1) {
      isLowSpot = isLowSpot && map[y + 1][x] > cell;
    }

    return isLowSpot;
  }

  getMap(): number[][] {
    return this.fileService
      .getFile('/input/lava-tubes.txt')
      .trim()
      .split('\n')
      .map((row) => row.split('').map((cell) => Number(cell)));
  }
}
