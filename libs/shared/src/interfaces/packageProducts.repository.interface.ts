import { PackageProductEntity } from "../entities/junctionTables/packageProducts.entity";
import { BaseInterfaceRepository } from "../repositories/base/base.interface.repository";


export interface PackageProductsRepositoryInterface
    extends BaseInterfaceRepository<PackageProductEntity> {}
