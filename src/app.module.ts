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
import { BingoController } from './bingo/bingo.controller';
import { BingoService } from './bingo/bingo.service';

@Module({
  imports: [],
  controllers: [AppController, SonarController, NavigationController, RatingsController, BingoController],
  providers: [AppService, SonarService, FileService, NavigationService, RatingsService, BingoService],
})
export class AppModule {}
