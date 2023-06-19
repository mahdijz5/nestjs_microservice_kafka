import { BaseInterfaceRepository } from '@app/shared';

import { CourseEntity } from '../entities/course.entity';

export interface courseRepositoryInterface
  extends BaseInterfaceRepository<CourseEntity> {}
