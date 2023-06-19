import { PackageProductEntity } from "../entities/junction-tables/packageProducts.entity";
import { BaseInterfaceRepository } from "../repositories/base/base.interface.repository";


export interface PackageProductsRepositoryInterface
    extends BaseInterfaceRepository<PackageProductEntity> {}
