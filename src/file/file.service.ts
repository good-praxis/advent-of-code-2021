import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileService {
  getFile(path: string) {
    if (fs.existsSync(`./src/${path}`)) {
      return fs.readFileSync(`./src/${path}`, 'utf8');
    }
    throw new Error('File not found');
  }
}
