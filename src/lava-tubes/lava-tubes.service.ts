import { Injectable } from '@nestjs/common';
import { FileService } from '../file/file.service';

@Injectable()
export class LavaTubesService {
  constructor(private readonly fileService: FileService) {}

  map = this.getMap();
  dimensionX = this.map[0].length;
  dimensionY = this.map.length;

  getRisk(): number {
    const lowSpots = new Array<number[]>();
    this.map.forEach((row, y) => {
      row.forEach((_cell, x) => {
        if (this.determineLowSpot(x, y)) lowSpots.push([x, y]);
      });
    });

    return lowSpots.reduce((acc, [x, y]) => {
      return acc + this.map[y][x] + 1;
    }, 0);
  }

  determineLowSpot(x: number, y: number): boolean {
    return this.getNeighbours([x, y]).every(
      (cord) => this.map[y][x] < this.map[cord[1]][cord[0]],
    );
  }

  getNeighbours([x, y]: number[]): number[][] {
    const result = [];
    if (x > 0) result.push([x - 1, y]);
    if (y > 0) result.push([x, y - 1]);
    if (x < this.dimensionX - 1) result.push([x + 1, y]);
    if (y < this.dimensionY - 1) result.push([x, y + 1]);
    return result;
  }

  getBasins(): number {
    // return sum of the 3 biggest basins

    const lowpoints = new Array<number[]>();
    this.map.forEach((row, y) => {
      row.forEach((_cell, x) => {
        if (this.determineLowSpot(x, y)) lowpoints.push([x, y]);
      });
    });

    const basins = lowpoints.map((cord) => this.getBasin(cord));
    basins.sort((a, b) => b - a);
    return basins.slice(0, 3).reduce((acc, curr) => acc * curr, 1);
  }

  getBasin(lowpoint: number[]): number {
    const visited = new Array<number[]>();
    const queue = [lowpoint];

    for (let i = 0; i < queue.length; i++) {
      const cord = queue[i];
      if (
        this.map[cord[1]][cord[0]] === 9 ||
        visited.some((value) => cord.toString() === value.toString())
      )
        continue;
      visited.push(cord);

      const neighbours = this.getNeighbours(cord);
      neighbours.forEach((neighbour) => {
        if (!queue.some((value) => neighbour.toString() === value.toString())) {
          queue.push(neighbour);
        }
      });
    }

    return visited.length;
  }

  getMap(): number[][] {
    return this.fileService
      .getFile('/input/lava-tubes.txt')
      .trim()
      .split('\n')
      .map((row) => row.split('').map((cell) => Number(cell)));
  }
}
