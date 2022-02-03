import { Barcode } from 'src/models/barcodes/entities/barcode.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  message: string;

  @Column()
  sender: string;

  @OneToOne(() => Barcode)
  @JoinColumn()
  barcodeId: string;

  @Column({ default: true })
  isOpened: boolean;
}
