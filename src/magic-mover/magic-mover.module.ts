import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagicMoverService } from './service/magic-mover.service';
import { MagicMoverController } from './controller/magic-mover.controller';
import { MagicMover } from './entity/magic-mover.entity';
import { MagicItem } from '../magic-item/entity/magic-item.entity';
import { LogModule } from '../log/log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MagicMover, MagicItem]),
    LogModule,
  ],
  providers: [MagicMoverService],
  controllers: [MagicMoverController],
})
export class MagicMoverModule {}
