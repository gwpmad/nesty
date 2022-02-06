import { NestFactory } from '@nestjs/core';
import { createDatabase } from 'typeorm-extension';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import configuration from './config/configuration';

async function bootstrap() {
  const { database } = configuration();
  await createDatabase({ ifNotExist: true }, database as any);
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
