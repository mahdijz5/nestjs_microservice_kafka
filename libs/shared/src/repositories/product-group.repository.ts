import { ProductEntity } from '../entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { ProductRepositoryInterface } from '../interfaces/product.repository.interface';
import { ProductGroupRepositoryInterface } from '../interfaces/product-group.repository.interface';
import { ProductGroupEntity } from '../entities/product-group.entity';

@Injectable()
export class ProductGroupRepository
    extends BaseAbstractRepository<ProductGroupEntity>
    implements ProductGroupRepositoryInterface {
    constructor(
        @InjectRepository(ProductGroupEntity)
        private readonly productGroupRepository: Repository<ProductGroupEntity>,
    ) {
        super(productGroupRepository);
    }
}
