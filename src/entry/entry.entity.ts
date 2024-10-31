
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: string; // E.164 format

  @Column({ default: new Date()})
  dateAdded: Date;  
}