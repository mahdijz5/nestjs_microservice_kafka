import { BaseInterfaceRepository } from '@app/shared';
import { UserRoleEntity } from '../entities/junctionTables/userRole.entity';

export interface UserRoleRepositoryInterface
  extends BaseInterfaceRepository<UserRoleEntity> {}
