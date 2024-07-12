import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { QuestState } from './quest-state.enum';

@Entity()
export class MagicMover {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weightLimit: number;

  @Column()
  energy: number;

  @Column({ default: 0 })
  numberOfMissions: number;

  @Column({
    type: 'enum',
    enum: QuestState,
    default: QuestState.RESTING,
  })
  status: QuestState;
}
