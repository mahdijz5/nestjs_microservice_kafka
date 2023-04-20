import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OrmModule, SharedModule, SharedService, UserEntity, UsersRepository } from '@app/shared';

@Module({
  imports: [
    SharedModule,
    OrmModule,
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [AuthController],
  providers: [AuthService,
    {
      provide: 'UsersRepositoryInterface',
      useClass: UsersRepository,
    },],
  
})
export class AuthModule {}
