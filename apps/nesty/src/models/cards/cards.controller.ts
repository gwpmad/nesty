import {
  Controller,
  Post,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  Req,
  HttpCode,
  Inject,
} from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { ClientKafka } from '@nestjs/microservices';
import { Request } from 'express';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from './entities/card.entity';
import { OpenRequestsParams } from './params/open-requests.params';

@Controller('cards')
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    @Inject('KAFKA_CLIENT')
    private readonly kafkaClient: ClientKafka,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createCardDto: CreateCardDto, @Req() request: Request) {
    const { userId } = request.cookies;
    if (!userId) {
      throw new ForbiddenException();
    }
    const createResult = await this.cardsService.create(createCardDto, userId);
    this.kafkaClient.emit<Card>('cardCreated', createResult);
  }

  @Post('openRequests/:cardId')
  @HttpCode(204)
  @UsePipes(ValidationPipe)
  open(@Param() params: OpenRequestsParams, @Req() request: Request) {
    const { userId } = request.cookies;
    if (!userId) {
      throw new ForbiddenException();
    }
    return this.cardsService.open(params.cardId);
  }
}
