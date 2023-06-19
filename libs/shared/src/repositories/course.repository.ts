
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { courseRepositoryInterface } from '../interfaces/course.repository.interface';
import { CourseEntity } from '../entities/course.entity';

@Injectable()
export class CourseRepository
  extends BaseAbstractRepository<CourseEntity>
  implements courseRepositoryInterface
{
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {
    super(courseRepository);
  }
}
