import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { QueryRunnerService } from 'src/database/query-runner.service';
import { BarcodesService } from '../barcodes/barcodes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [CardsController],
  providers: [CardsService, BarcodesService, QueryRunnerService],
})
export class CardsModule {}
