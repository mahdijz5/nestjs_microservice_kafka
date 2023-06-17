import { ProductGroupEntity } from "../entities/productGroup.entity";
import { BaseInterfaceRepository } from "../repositories/base/base.interface.repository";


export interface ProductGroupRepositoryInterface
  extends BaseInterfaceRepository<ProductGroupEntity> {}
