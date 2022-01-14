import { Card } from 'src/models/cards/entities/card.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Barcode {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  numbers: number;

  @Column()
  sender: string;

  @OneToOne(() => Card, (card) => card.barcodeId)
  cardId: string;
}
