import { KafkaContext, KafkaOptions,  } from '@nestjs/microservices';

export interface SharedServiceInterface {
  getRmqOptions(customer: string): KafkaOptions;
  acknowledgeMessage(context: KafkaContext): void;
}
