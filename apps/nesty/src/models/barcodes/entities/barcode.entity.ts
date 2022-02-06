import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Barcode {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  number: number;
}
