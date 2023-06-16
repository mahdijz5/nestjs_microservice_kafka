
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { PackageEntity } from '../entities/package.entity';
import { PackageRepositoryInterface } from '../interfaces/package.repository.interface';

@Injectable()
export class PackageRepository
  extends BaseAbstractRepository<PackageEntity>
  implements PackageRepositoryInterface
{
  constructor(
    @InjectRepository(PackageEntity)
    private readonly PackageRepository: Repository<PackageEntity>,
  ) {
    super(PackageRepository);
  }
}
