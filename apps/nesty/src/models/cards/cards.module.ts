import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { BarcodesService } from '../barcodes/barcodes.service';
import { QueryRunnerService } from '../../database/query-runner.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [CardsController],
  providers: [CardsService, BarcodesService, QueryRunnerService],
})
export class CardsModule {}
