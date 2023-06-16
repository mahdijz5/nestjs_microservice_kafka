
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { RoleEntity } from '../entities/role.entity';
import { RoleRepositoryInterface } from '../interfaces/role.repository.interface';

@Injectable()
export class RoleRepository
  extends BaseAbstractRepository<RoleEntity>
  implements RoleRepositoryInterface
{
  constructor(
    @InjectRepository(RoleEntity)
    private readonly UserRepository: Repository<RoleEntity>,
  ) {
    super(UserRepository);
  }
}
