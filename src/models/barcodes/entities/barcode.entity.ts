import { Card } from 'src/models/cards/entities/card.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Barcode {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  number: number;
}
