import { PackageVersionEntity } from "../entities/package-version.entity";
import { BaseInterfaceRepository } from "../repositories/base/base.interface.repository";


export interface PackageVersionRepositoryInterface
  extends BaseInterfaceRepository<PackageVersionEntity> {}
