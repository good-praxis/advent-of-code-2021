import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SonarService } from './sonar/sonar.service';
import { SonarController } from './sonar/sonar.controller';
import { FileService } from './file/file.service';
import { NavigationService } from './navigation/navigation.service';
import { NavigationController } from './navigation/navigation.controller';

@Module({
  imports: [],
  controllers: [AppController, SonarController, NavigationController],
  providers: [AppService, SonarService, FileService, NavigationService],
})
export class AppModule {}
