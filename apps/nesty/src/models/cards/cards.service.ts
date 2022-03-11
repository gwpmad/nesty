import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from './entities/card.entity';
import { BarcodesService } from '../barcodes/barcodes.service';
import { QueryRunnerService } from '../../database/query-runner.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    private queryRunnerService: QueryRunnerService,
    private barcodesService: BarcodesService,
  ) {}

  create(createCardDto: CreateCardDto, userId: string): Promise<Card> {
    return this.queryRunnerService.withTransaction<Card>(
      async (queryRunner: QueryRunner) => {
        const barcode = await this.barcodesService.create();
        const card = plainToInstance(Card, {
          message: createCardDto.message,
          barcodeId: barcode.id,
          isOpened: false,
          sender: userId,
        });
        console.log('card', card)
        return queryRunner.manager.save(card);
      },
    );
  }

  async open(cardId: string): Promise<void> {
    const card = await this.cardsRepository.findOne({ id: cardId });
    if (!card)
      throw new NotFoundException(
        { cardId },
        'Card to open not found with supplied cardId',
      );

    await this.cardsRepository.update({ id: cardId }, { isOpened: true });
  }
}
