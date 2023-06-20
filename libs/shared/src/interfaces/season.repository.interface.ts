import { BaseInterfaceRepository } from '@app/shared';

import { SeasonEntity } from '../entities/season.entity';

export interface seasonRepositoryInterface
  extends BaseInterfaceRepository<SeasonEntity> {}
