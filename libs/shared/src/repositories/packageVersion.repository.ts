
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { PackageVersionEntity } from '../entities/packageVersion.entity';
import { PackageVersionRepositoryInterface } from '../interfaces/packageVersion.repository.interface';

@Injectable()
export class PackageVersionRepository
  extends BaseAbstractRepository<PackageVersionEntity>
  implements PackageVersionRepositoryInterface
{
  constructor(
    @InjectRepository(PackageVersionEntity)
    private readonly PackageVersionRepository: Repository<PackageVersionEntity>,
  ) {
    super(PackageVersionRepository);
  }
}
