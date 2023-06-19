import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { UserRoleEntity } from '../entities/junction-tables/userRole.entity';

@Injectable()
export class UserRoleRepository
  extends BaseAbstractRepository<UserRoleEntity>
  implements UserRoleRepository
{
  constructor(
    @InjectRepository(UserRoleEntity)
    private readonly UserRoleRepository: Repository<UserRoleEntity>,
  ) {
    super(UserRoleRepository);
  }
}