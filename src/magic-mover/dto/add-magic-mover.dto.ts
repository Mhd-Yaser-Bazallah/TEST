import { IsNumber } from 'class-validator';

export class AddMagicMoverDto {
  @IsNumber()
  weightLimit: number;

  @IsNumber()
  energy: number;
}
