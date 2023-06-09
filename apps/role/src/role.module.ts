import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { OrmModule, RoleEntity, RoleRepository, SharedModule, UserEntity, UserRoleEntity, UserRoleRepository } from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [    
    SharedModule,
    OrmModule,
    TypeOrmModule.forFeature([RoleEntity,UserRoleEntity,UserEntity])],
  controllers: [RoleController],
  providers: [RoleService,{
    provide : "RoleRepositoryInterface",
    useClass : RoleRepository
  },
  {
    provide : "UserRolesRepositoryInterface",
    useClass : UserRoleRepository
  }],
})

export class RoleModule {}
