import { IsEnum } from 'class-validator';
import { QuestState } from '../entity/quest-state.enum';

export class ChangeMoverStatusDto {
  @IsEnum(QuestState)
  status: QuestState;
}
