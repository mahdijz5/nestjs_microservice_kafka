import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheStore, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OrmModule, RoleEntity, SharedModule, UserEntity, UserRoleEntity, UserRoleRepository, UsersRepository } from '@app/shared';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import {redisStore} from 'cache-manager-redis-store';
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),
    SharedModule.registerKafka("EMAIL_SERVICE",process.env.KAFKA_EMAIL_CONSUMER),
    SharedModule.registerKafka("ROLE_SERVICE",process.env.KAFKA_ROLE_CONSUMER),
    TypeOrmModule.forFeature([UserEntity,UserRoleEntity,RoleEntity]),
    OrmModule,
   
CacheModule.registerAsync({
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => (<RedisClientOptions>{
    ttl: 1000 * 60 * 10,
    store: (await redisStore({
      url: configService.get("REDIS_URI"),
    })) as unknown as CacheStore,
  }),
  inject: [ConfigService],
}),
  ],
  controllers: [AuthController],
  providers: [AuthService,
    JwtGuard,
    JwtStrategy,
    {
      provide: 'UsersRepositoryInterface',
      useClass: UsersRepository,
    },
    {
      provide : "UserRolesRepositoryInterface",
      useClass : UserRoleRepository
    }],
  
})
export class AuthModule {}
