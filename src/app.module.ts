import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SonarService } from './sonar/sonar.service';
import { SonarController } from './sonar/sonar.controller';
import { FileService } from './file/file.service';

@Module({
  imports: [],
  controllers: [AppController, SonarController],
  providers: [AppService, SonarService, FileService],
})
export class AppModule {}
