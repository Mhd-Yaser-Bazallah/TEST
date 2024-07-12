import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MagicMover } from '../entity/magic-mover.entity';
import { MagicItem } from '../../magic-item/entity/magic-item.entity';
import { LogService } from '../../log/service/log.service';
import { QuestState } from '../entity/quest-state.enum';
import { AddMagicMoverDto } from '../dto/add-magic-mover.dto';

@Injectable()
export class MagicMoverService {
  constructor(
    @InjectRepository(MagicMover) private readonly moverRepo: Repository<MagicMover>,
    @InjectRepository(MagicItem) private readonly itemRepo: Repository<MagicItem>,
    private readonly logService: LogService
  ) {}

  async create(addMagicMoverDto: AddMagicMoverDto) {
    const magicMover = this.moverRepo.create(addMagicMoverDto);
    return this.moverRepo.save(magicMover);
  }

  async loadItemsOntoMover(moverId: number, itemNames: string[]) {
    const mover = await this.moverRepo.findOne({ where: { id: moverId } });

    if (!mover) {
      throw new HttpException('MagicMover not found', HttpStatus.NOT_FOUND);
    }

    if (mover.status === QuestState.ON_MISSION) {
      throw new HttpException('MagicMover is on a mission', HttpStatus.BAD_REQUEST);
    }

    const items = await this.itemRepo.findByIds(itemNames);
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

    if (mover.weightLimit < totalWeight || mover.energy < totalWeight) {
      throw new HttpException('Insufficient capacity or energy', HttpStatus.BAD_REQUEST);
    }

    items.forEach(item => item.moverId = moverId);
    this.logService.create(mover.id, 'LoadItems', new Date());
    return this.itemRepo.save(items);
  }

  async changeStatus(moverId: number, status: QuestState) {
    const mover = await this.moverRepo.findOne({ where: { id: moverId } });

    if (!mover) {
      throw new HttpException('MagicMover not found', HttpStatus.NOT_FOUND);
    }

    if (mover.status === QuestState.ON_MISSION) {
      throw new HttpException('MagicMover is on a mission', HttpStatus.BAD_REQUEST);
    }

    mover.status = status;
    if (status === QuestState.DONE) {
      mover.numberOfMissions += 1;
    }

    this.logService.create(mover.id, status, new Date());
    return this.moverRepo.save(mover);
  }

  async getMoverWithMostMissions(): Promise<MagicMover> {
    const [mover] = await this.moverRepo.find({
      order: { numberOfMissions: 'DESC' },
      take: 1,
    });

    if (!mover) {
      throw new HttpException('No MagicMover found', HttpStatus.NOT_FOUND);
    }

    return mover;
  }
}
