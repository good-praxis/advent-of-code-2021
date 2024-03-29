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
import { HydrothermicVentService } from './hydrothermic-vent/hydrothermic-vent.service';
import { HydrothermicVentController } from './hydrothermic-vent/hydrothermic-vent.controller';
import { LanternfishService } from './lanternfish/lanternfish.service';
import { LanternfishController } from './lanternfish/lanternfish.controller';
import { CrabsController } from './crabs/crabs.controller';
import { CrabsService } from './crabs/crabs.service';
import { SevenSegmentDisplayService } from './seven-segment-display/seven-segment-display.service';
import { SevenSegmentDisplayController } from './seven-segment-display/seven-segment-display.controller';
import { LavaTubesService } from './lava-tubes/lava-tubes.service';
import { LavaTubesController } from './lava-tubes/lava-tubes.controller';
import { SyntaxController } from './syntax/syntax.controller';
import { SyntaxService } from './syntax/syntax.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    SonarController,
    NavigationController,
    RatingsController,
    BingoController,
    HydrothermicVentController,
    LanternfishController,
    CrabsController,
    SevenSegmentDisplayController,
    LavaTubesController,
    SyntaxController,
  ],
  providers: [
    AppService,
    SonarService,
    FileService,
    NavigationService,
    RatingsService,
    BingoService,
    HydrothermicVentService,
    LanternfishService,
    CrabsService,
    SevenSegmentDisplayService,
    LavaTubesService,
    SyntaxService,
  ],
})
export class AppModule {}
