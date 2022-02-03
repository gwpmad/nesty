import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { QueryRunnerService } from 'src/database/query-runner.service';
import { BarcodesService } from '../barcodes/barcodes.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    private queryRunnerService: QueryRunnerService,
    private barcodesService: BarcodesService,
  ) {}

  async create(createCardDto: CreateCardDto, userId: string): Promise<Card> {
    return this.queryRunnerService.withTransaction<Card>( // do in controller
      async (queryRunner: QueryRunner) => {
        const barcode = await this.barcodesService.create();
        const card = plainToInstance(Card, {
          message: createCardDto.message,
          barcodeId: barcode.id,
          isOpened: false,
          sender: userId,
        });
        return queryRunner.manager.save(card);
      },
    );
  }

  findAll(): Promise<Card[]> {
    return this.cardsRepository.find();
  }

  findOne(id: number) {
    return this.cardsRepository.findOne(id);
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  async remove(id: string) {
    await this.cardsRepository.delete(id);
  }
}
