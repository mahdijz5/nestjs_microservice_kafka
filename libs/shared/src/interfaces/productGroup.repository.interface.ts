import { ProductGroupEntity } from "../entities/product-group.entity";
import { BaseInterfaceRepository } from "../repositories/base/base.interface.repository";


export interface ProductGroupRepositoryInterface
  extends BaseInterfaceRepository<ProductGroupEntity> {}
