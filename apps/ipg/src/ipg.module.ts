import { Module } from '@nestjs/common';
import { IpgController } from './ipg.controller';
import { IpgService } from './ipg.service';
import { OrmModule, PackageEntity, PackageProductEntity, PackageVersionEntity, PackageVersionRepository, ProductEntity, ProductGroupEntity, SharedModule } from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentGatewayEntity } from '@app/shared/entities/paymentGateway.entity';
import { PaymentGatewayRepository } from '@app/shared/repositories/paymentGateway.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { OrderEntity } from '@app/shared/entities/order.entity';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { OrderRepository } from '@app/shared/repositories/order.repository';
import { TempOrderRepository } from '@app/shared/repositories/temp-order.repository';
import { TempOrderEntity } from '@app/shared/entities/temp-order.entity';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 15,
    }),
    SharedModule,
    TypeOrmModule.forFeature([OrderEntity,PaymentGatewayEntity,PackageVersionEntity,PackageEntity,PackageProductEntity,ProductGroupEntity,ProductEntity,TempOrderEntity]),
    OrmModule,
     
  ],
  controllers: [IpgController],
  providers: [IpgService, {
    provide: "PaymentGatewayRepositoryInterface",
    useClass: PaymentGatewayRepository
  },
{
  provide :  "PackageVersionRepositoryInterface",
  useClass :PackageVersionRepository
},
{
  provide :  "OrderRepositoryInterface",
  useClass :OrderRepository
},
{
  provide :  "TempOrderRepositoryInterface",
  useClass :TempOrderRepository
}],

})
export class IpgModule { }
