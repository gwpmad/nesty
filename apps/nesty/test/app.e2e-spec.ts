import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as cookieParser from 'cookie-parser';
import { Repository } from 'typeorm';
import { Card } from '../src/models/cards/entities/card.entity';
import { createDatabase } from 'typeorm-extension';
import configuration from '../src/config/configuration';

describe('App (e2e)', () => {
  let app: INestApplication;
  let cardsRepository: Repository<Card>;

  beforeAll(async () => {
    const { database } = configuration();
    await createDatabase({ ifNotExist: true }, database as any);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());

    await app.init();
    cardsRepository = moduleFixture.get('CardRepository');
  });

  describe('Cards', () => {
    it('/cards (POST) should require a userId cookie', async () => {
      await request(app.getHttpServer())
        .post('/cards')
        .set('Cookie', 'wrongCookie=wrong')
        .send({ message: 'Test card message' })
        .expect(403);
    });

    it('/cards (POST) should create a card', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/cards')
        .set('Cookie', 'userId=some-user-id')
        .send({ message: 'Test card message' })
        .expect(201);

      const savedCard = await cardsRepository.findOne({ id: body.id });
      expect(savedCard.message).toEqual('Test card message');
      expect(savedCard.id).toEqual(body.id);
      expect(savedCard.sender).toEqual('some-user-id');
      expect(savedCard.isOpened).toEqual(false);
    });

    it('/cards (POST) should create a barcode too', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/cards')
        .set('Cookie', 'userId=some-user-id')
        .send({ message: 'Test card message' })
        .expect(201);

      const savedCard = await cardsRepository.findOne({
        where: { id: body.id },
        relations: ['barcode'],
      });
      expect(savedCard.barcodeId).toEqual(savedCard.barcode.id);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
