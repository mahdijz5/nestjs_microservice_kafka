import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheStore, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OrmModule, SharedModule, SharedService, UserEntity, UsersRepository } from '@app/shared';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
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
    SharedModule,
    SharedModule.registerKafka("EMAIL_SERVICE",process.env.KAFKA_EMAIL_CONSUMER),
    OrmModule,
    TypeOrmModule.forFeature([UserEntity]),
   
CacheModule.registerAsync({
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => (<RedisClientOptions>{
    ttl: 1000 * 60 * 10,
    store: (await redisStore({
      url: "redis://localhost:6379",
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
    },],
  
})
export class AuthModule {}
