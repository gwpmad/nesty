import { Barcode } from '../../barcodes/entities/barcode.entity';
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

  @Column({ default: true })
  isOpened: boolean;

  @Column({ name: 'barcode_id' })
  barcodeId: string;

  @OneToOne(() => Barcode)
  @JoinColumn({ name: 'barcode_id' })
  barcode: Barcode;
}
