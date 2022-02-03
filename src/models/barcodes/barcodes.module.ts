import { Module } from '@nestjs/common';
import { BarcodesService } from './barcodes.service';
import { BarcodesController } from './barcodes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barcode } from './entities/barcode.entity';
import { QueryRunnerService } from 'src/database/query-runner.service';

@Module({
  imports: [TypeOrmModule.forFeature([Barcode])],
  controllers: [BarcodesController],
  providers: [BarcodesService, QueryRunnerService],
})
export class BarcodesModule {}
