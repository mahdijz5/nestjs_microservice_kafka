
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { OrderRepositoryInterface } from '../interfaces/order.repository.interface';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderRepository
  extends BaseAbstractRepository<OrderEntity>
  implements OrderRepositoryInterface
{
  constructor(
    @InjectRepository(OrderEntity)
    private readonly OrderRepository: Repository<OrderEntity>,
  ) {
    super(OrderRepository);
  }
}
