import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SonarService } from './sonar/sonar.service';
import { SonarController } from './sonar/sonar.controller';
import { FileService } from './file/file.service';
import { NavigationService } from './navigation/navigation.service';
import { NavigationController } from './navigation/navigation.controller';
import { RatingsService } from './ratings/ratings.service';
import { RatingsController } from './ratings/ratings.controller';

@Module({
  imports: [],
  controllers: [AppController, SonarController, NavigationController, RatingsController],
  providers: [AppService, SonarService, FileService, NavigationService, RatingsService],
})
export class AppModule {}
