import { Module } from '@nestjs/common';
import { IpgController } from './ipg.controller';
import { IpgService } from './ipg.service';
import { OrmModule, SharedModule } from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentGatewayEntity } from '@app/shared/entities/paymentGateway.entity';
import { PaymentGatewayRepository } from '@app/shared/repositories/paymentGateway.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
  SharedModule,
  TypeOrmModule.forFeature([PaymentGatewayEntity]),
  OrmModule,
],
  controllers: [IpgController],
  providers: [IpgService, {
    provide : "PaymentGatewayRepositoryInterface",
    useClass : PaymentGatewayRepository
  }],

})
export class IpgModule {}
