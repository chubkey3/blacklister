
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(["phoneNumber"])
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: string; // E.164 format

  @Column({ default: new Date()})
  dateAdded: Date;  
}