import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  moverId: number;

  @Column()
  endPoint: string;

  @Column()
  date: Date;
}
