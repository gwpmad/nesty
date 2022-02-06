import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { QueryRunner } from 'typeorm';
import { QueryRunnerService } from '../../database/query-runner.service';
import { Barcode } from './entities/barcode.entity';

@Injectable()
export class BarcodesService {
  constructor(private queryRunnerService: QueryRunnerService) {}

  async create(): Promise<Barcode> {
    const barcode = plainToInstance(Barcode, {
      number: this._generateNumber(),
    });
    return this.queryRunnerService.withTransaction<Barcode>(
      (queryRunner: QueryRunner) => queryRunner.manager.save(barcode),
    );
  }

  _generateNumber() {
    return Math.floor(Math.random() * 1000000000);
  }
}
