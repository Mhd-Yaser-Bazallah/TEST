import { Controller, Body, Post, Param, Get } from '@nestjs/common';
import { MagicMoverService } from '../service/magic-mover.service';
import { AddMagicMoverDto } from '../dto/add-magic-mover.dto';
import { QuestState } from '../entity/quest-state.enum';

@Controller('magic-mover')
export class MagicMoverController {
  constructor(private readonly magicMoverService: MagicMoverService) {}

  @Post('add-magic-mover')
  async addMagicMover(@Body() addMagicMoverDto: AddMagicMoverDto) {
    return this.magicMoverService.create(addMagicMoverDto);
  }

  @Post('load-items/:id')
  async loadItems(@Param('id') id: string, @Body() items: string[]) {
    return this.magicMoverService.loadItemsOntoMover(parseInt(id), items);
  }

  @Post('start-mission/:id')
  async startMission(@Param('id') id: string) {
    return this.magicMoverService.changeStatus(parseInt(id), QuestState.ON_MISSION);
  }

  @Post('end-mission/:id')
  async endMission(@Param('id') id: string) {
    return this.magicMoverService.changeStatus(parseInt(id), QuestState.DONE);
  }

  @Get('leader')
  async getLeader() {
    return this.magicMoverService.getMoverWithMostMissions();
  }
}
