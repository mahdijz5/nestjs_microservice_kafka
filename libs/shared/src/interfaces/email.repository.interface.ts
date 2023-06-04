import { BaseInterfaceRepository } from '@app/shared';

import { EmailEntity } from '../entities/email.entity';

export interface EmailRepositoryInterface
  extends BaseInterfaceRepository<EmailEntity> {}
