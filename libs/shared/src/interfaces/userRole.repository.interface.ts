import { BaseInterfaceRepository } from '@app/shared';
import { UserRoleEntity } from '../entities/userRole.entity';

export interface UserRoleRepositoryInterface
  extends BaseInterfaceRepository<UserRoleEntity> {}
