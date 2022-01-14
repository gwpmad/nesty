import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  message: string;

  @Column()
  sender: string;

  @Column()
  barcodeId: string;

  @Column({ default: true })
  isOpened: boolean;
}
