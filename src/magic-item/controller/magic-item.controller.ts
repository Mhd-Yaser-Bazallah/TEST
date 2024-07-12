import { Controller, Body, Post } from '@nestjs/common';
import { MagicItemService } from '../service/magic-item.service';
import { AddMagicItemDto } from '../dto/add-magic-item.dto';

@Controller('magic-items')
export class MagicItemController {
  constructor(private readonly magicItemService: MagicItemService) {}

  @Post('add-magic-items')
  async addMagicItem(@Body() addMagicItemDto: AddMagicItemDto) {
    return this.magicItemService.create(addMagicItemDto);
  }
}
