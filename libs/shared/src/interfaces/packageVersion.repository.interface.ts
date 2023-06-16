import { PackageVersionEntity } from "../entities/packageVersion.entity";
import { BaseInterfaceRepository } from "../repositories/base/base.interface.repository";


export interface PackageVersionRepositoryInterface
  extends BaseInterfaceRepository<PackageVersionEntity> {}
