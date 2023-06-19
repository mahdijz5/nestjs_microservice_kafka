import { BaseInterfaceRepository } from '@app/shared';

import { OrderEntity } from '../entities/order.entity';

export interface OrderRepositoryInterface
  extends BaseInterfaceRepository<OrderEntity> {}
