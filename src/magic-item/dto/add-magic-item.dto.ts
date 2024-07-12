import { IsNumber, IsString } from 'class-validator';

export class AddMagicItemDto {
  @IsString()
  name: string;

  @IsNumber()
  weight: number;
}
