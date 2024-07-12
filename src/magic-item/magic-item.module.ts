import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagicItemService } from './service/magic-item.service';
import { MagicItemController } from './controller/magic-item.controller';
import { MagicItem } from './entity/magic-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MagicItem])],
  providers: [MagicItemService],
  controllers: [MagicItemController],
})
export class MagicItemModule {}
