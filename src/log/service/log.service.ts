import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../entity/log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log) private readonly logRepo: Repository<Log>,
  ) {}

  async create(moverId: number, endPoint: string, date: Date) {
    const newLog = this.logRepo.create({ moverId, endPoint, date });
    return this.logRepo.save(newLog);
  }
}
