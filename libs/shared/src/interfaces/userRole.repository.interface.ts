import { BaseInterfaceRepository } from '@app/shared';
import { UserRoleEntity } from '../entities/junction-tables/userRole.entity';

export interface UserRoleRepositoryInterface
  extends BaseInterfaceRepository<UserRoleEntity> {}
