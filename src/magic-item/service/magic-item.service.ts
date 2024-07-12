import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MagicItem } from '../entity/magic-item.entity';
import { AddMagicItemDto } from '../dto/add-magic-item.dto';

@Injectable()
export class MagicItemService {
  constructor(
    @InjectRepository(MagicItem)
    private readonly magicItemRepository: Repository<MagicItem>,
  ) {}

  create(addMagicItemDto: AddMagicItemDto) {
    const magicItem = this.magicItemRepository.create(addMagicItemDto);
    return this.magicItemRepository.save(magicItem);
  }
}
