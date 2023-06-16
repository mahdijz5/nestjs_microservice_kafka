import { PackageEntity } from "../entities/package.entity";
import { BaseInterfaceRepository } from "../repositories/base/base.interface.repository";


export interface PackageRepositoryInterface
  extends BaseInterfaceRepository<PackageEntity> {}
