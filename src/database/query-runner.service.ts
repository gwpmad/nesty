import { Injectable } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';

@Injectable()
export class QueryRunnerService {
  constructor(private connection: Connection) {}

  private queryRunner: QueryRunner;
  private stack = 0;

  public async withTransaction<EntityType>(
    unitOfWork: (queryRunner: QueryRunner) => Promise<EntityType>,
  ): Promise<EntityType> {
    this.stack++;

    if (!this.queryRunner) {
      this.queryRunner = this.connection.createQueryRunner();
      await this.queryRunner.connect();
      await this.queryRunner.startTransaction();
    }

    try {
      const result = await unitOfWork.call(this, this.queryRunner);
      return result;
    } catch (err) {
      await this.queryRunner.rollbackTransaction();
      throw err;
    } finally {
      this.stack--;
      if (this.stack === 0) {
        await this.queryRunner.commitTransaction();
        await this.queryRunner.release();
        this.queryRunner = null;
      }
    }
  }
}
