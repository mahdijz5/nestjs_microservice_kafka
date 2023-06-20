import { BaseInterfaceRepository } from '@app/shared';
import { UserRoleEntity } from '../entities/junction-tables/user-role.entity';

export interface UserRoleRepositoryInterface
  extends BaseInterfaceRepository<UserRoleEntity> {}
