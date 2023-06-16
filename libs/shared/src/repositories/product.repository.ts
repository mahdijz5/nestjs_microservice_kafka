import { ProductEntity } from './../entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { ProductRepositoryInterface } from '../interfaces/product.repository.interface';

@Injectable()
export class ProductRepository
    extends BaseAbstractRepository<ProductEntity>
    implements ProductRepositoryInterface {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) {
        super(productRepository);
    }
}
