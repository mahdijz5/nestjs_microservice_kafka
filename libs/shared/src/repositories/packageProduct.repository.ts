
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { PackageProductEntity } from '../entities/junction-tables/packageProducts.entity';
import { PackageProductsRepositoryInterface } from '../interfaces/packageProducts.repository.interface';

@Injectable()
export class PackageProductRepository
  extends BaseAbstractRepository<PackageProductEntity>
  implements PackageProductsRepositoryInterface
{
  constructor(
    @InjectRepository(PackageProductEntity)
    private readonly PackageProductRepository: Repository<PackageProductEntity>,
  ) {
    super(PackageProductRepository);
  }
}
