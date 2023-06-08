import { EmailEntity, UserEntity } from '@app/shared';
import { RoleEntity } from '@app/shared/entities/role.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: "postgresql://postgres:root@localhost:5432/postgres",
  entities : [RoleEntity,UserEntity,EmailEntity],
  migrations: ['dist/apps/api/apps/api/src/db/migrations/*.js'],
};

export const dataSource = new DataSource(dataSourceOptions);
