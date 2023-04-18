import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaContext, KafkaOptions, RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import { SharedServiceInterface } from './interfaces/shared.service.interface';


@Injectable()
export class SharedService implements SharedServiceInterface  {
    constructor(private readonly configService: ConfigService) { }

    getRmqOptions(customer: string): KafkaOptions {
        const host = this.configService.get("KAFAKA_HOST")
        return {
            transport: Transport.KAFKA,
            options: {
                client: {
                    brokers: [host],
                },
            },
        };
    }

    acknowledgeMessage(context: KafkaContext) {
        // const channel = context.get();
        // const message = context.getMessage();
        // channel.ack(message);
        console.log(123456)
    }
}
