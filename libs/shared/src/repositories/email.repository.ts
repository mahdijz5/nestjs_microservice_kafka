
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { EmailRepositoryInterface } from '../interfaces/email.repository.interface';
import { EmailEntity } from '../entities/email.entity';

@Injectable()
export class EmailRepository
  extends BaseAbstractRepository<EmailEntity>
  implements EmailRepositoryInterface
{
  constructor(
    @InjectRepository(EmailEntity)
    private readonly UserRepository: Repository<EmailEntity>,
  ) {
    super(UserRepository);
  }
}
