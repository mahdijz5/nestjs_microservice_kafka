import { BaseInterfaceRepository } from '@app/shared'
import { TempOrderEntity } from '../entities/temp-order.entity';


export interface TempOrderRepositoryInterface
  extends BaseInterfaceRepository<TempOrderEntity> {}