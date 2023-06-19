
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { TempOrderRepositoryInterface } from '../interfaces/temp-order.repository.interface';
import { TempOrderEntity } from '../entities/temp-order.entity';

@Injectable()
export class TempOrderRepository
  extends BaseAbstractRepository<TempOrderEntity>
  implements TempOrderRepositoryInterface
{
  constructor(
    @InjectRepository(TempOrderEntity)
    private readonly TempOrderRepository: Repository<TempOrderEntity>,
  ) {
    super(TempOrderRepository);
  }
}
