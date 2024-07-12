import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MagicItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  weight: number;

  @Column({ nullable: true })
  moverId: number;
}
