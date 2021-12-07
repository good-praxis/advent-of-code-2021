import { Injectable } from '@nestjs/common';
import { FileService } from '../file/file.service';

@Injectable()
export class BingoService {
  boards: number[][][];
  drawList: number[];
  currentDraw: number;
  previousDraws: number[] = [];
  winningBoards: number[][][];

  constructor(private readonly fileService: FileService) {}

  getWinningScore(): number {
    this.parseData(this.fileService.getFile('/input/bingo.txt').split('\n\n'));

    while (true) {
      this.processDraw();
      if (this.boards.length === 0) {
        return -1;
      }

      if (this.winningBoards?.length > 0) {
        return this.calcScore(this.winningBoards[0]);
      }
    }
  }

  getLosingScore(): number {
    this.parseData(this.fileService.getFile('/input/bingo.txt').split('\n\n'));

    // we are searching for the board that gets a bingo last
    while (true) {
      this.processDraw();
      if (this.boards.length === 0) {
        return this.calcScore(this.winningBoards.pop());
      } else if (this.drawList.length === 0) {
        return -1;
      }
    }
  }

  processDraw(): void {
    this.currentDraw = this.drawList.shift();
    this.previousDraws.push(this.currentDraw);

    // for each board, replace the draw number with -1
    this.boards = this.boards.map((board) => {
      return board.map((row) => {
        return row.map((num) => {
          if (num === this.currentDraw) {
            return -1;
          }
          return num;
        });
      });
    });

    // update winning boards, if uninitalized, set to result of filtering board for bingo
    if (!this.winningBoards) {
      this.winningBoards = this.boards.filter((board) => {
        return this.hasBingo(board);
      });
    } else {
      // else concat new boards to winning boards
      this.winningBoards = this.winningBoards.concat(
        this.boards.filter((board) => {
          return this.hasBingo(board);
        }),
      );
    }

    // remove winning boards from board list
    this.boards = this.boards.filter((board) => !this.hasBingo(board));
  }

  calcScore(board: number[][]): number {
    //return product of the last drawn number and the sum of remaining numbers in board that aren't -1
    return (
      this.currentDraw *
      board.reduce((acc, row) => {
        return (
          acc +
          row.reduce((acc, num) => {
            if (num !== -1) {
              return acc + num;
            }
            return acc;
          }, 0)
        );
      }, 0)
    );
  }

  parseData(data: string[] = []) {
    // if no data empty, load from file, split at empty line
    if (data.length === 0) {
      data = this.fileService.getFile('/input/bingo.txt').split('\n\n');
    }

    // drawlist is the first index of data, split by comma, parse to int
    this.drawList = data[0].split(',').map((x) => parseInt(x, 10));

    // boards are the rest of data, split by newline, then split by empty space, filter out empty strings, parse to int
    this.boards = data.slice(1).map((board) =>
      board.split('\n').map((row) =>
        row
          .split(' ')
          .filter((x) => x !== '')
          .map((x) => parseInt(x, 10)),
      ),
    );
  }

  hasBingo(board: number[][]): boolean {
    // if any row or column has all -1s, then bingo
    for (let i = 0; i < 5; i++) {
      if (board[i].every((x) => x === -1)) {
        return true;
      } else if (board.every((row) => row[i] === -1)) {
        return true;
      }
    }
    return false;
  }
}
