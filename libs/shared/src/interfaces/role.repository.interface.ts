import { RoleEntity } from "../entities/role.entity";
import { BaseInterfaceRepository } from "../repositories/base/base.interface.repository";


export interface RoleRepositoryInterface
  extends BaseInterfaceRepository<RoleEntity> {}
