
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { PaymentGatewayEntity } from '../entities/payment-gateway.entity';
import { PaymentGatewayRepositoryInterface } from '../interfaces/paymentGateway.repository.interface';

@Injectable()
export class PaymentGatewayRepository
    extends BaseAbstractRepository<PaymentGatewayEntity>
    implements PaymentGatewayRepositoryInterface {
    constructor(
        @InjectRepository(PaymentGatewayEntity)
        private readonly paymentGatewayRepository: Repository<PaymentGatewayEntity>,
    ) {
        super(paymentGatewayRepository);
    }
}
