import { PaymentGatewayEntity } from "../entities/paymentGateway.entity";
import { BaseInterfaceRepository } from "../repositories/base/base.interface.repository";


export interface PaymentGatewayRepositoryInterface
  extends BaseInterfaceRepository<PaymentGatewayEntity> {}
