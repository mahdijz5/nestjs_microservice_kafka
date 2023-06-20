import { PaymentGatewayEntity } from "../entities/payment-gateway.entity";
import { BaseInterfaceRepository } from "../repositories/base/base.interface.repository";


export interface PaymentGatewayRepositoryInterface
  extends BaseInterfaceRepository<PaymentGatewayEntity> {}
