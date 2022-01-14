import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { CardsModule } from './models/cards/cards.module';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Card } from './models/cards/entities/card.entity';
import { BarcodesModule } from './models/barcodes/barcodes.module';
import { Barcode } from './models/barcodes/entities/barcode.entity';

@Module({
  imports: [
    CardsModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const {
          host,
          port,
          database,
          username,
          password,
          type,
          synchronize,
          migrationsRun,
          autoLoadEntities,
        } = configService.get('database');
        return {
          type,
          host,
          port,
          database,
          username,
          password,
          synchronize,
          migrationsRun,
          autoLoadEntities,
          entities: [],
          migrations: ['dist/migration/*.js'],
          namingStrategy: new SnakeNamingStrategy(),
          cli: {
            migrationsDir: 'migration',
          },
          migrationsTableName: 'migrations',
        };
      },
      inject: [ConfigService],
    }),
    BarcodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
