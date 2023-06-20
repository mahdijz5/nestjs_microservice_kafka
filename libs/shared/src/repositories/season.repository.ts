
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { seasonRepositoryInterface } from '../interfaces/season.repository.interface';
import { SeasonEntity } from '../entities/season.entity';

@Injectable()
export class SeasonRepository
  extends BaseAbstractRepository<SeasonEntity>
  implements seasonRepositoryInterface
{
  constructor(
    @InjectRepository(SeasonEntity)
    private readonly seasonRepository: Repository<SeasonEntity>,
  ) {
    super(seasonRepository);
  }
}
