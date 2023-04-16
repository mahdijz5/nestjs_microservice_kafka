import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport, } from '@nestjs/microservices';

import { SharedService } from '../shared.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './.env',
        }),
    ],
      providers: [SharedService],
      exports: [SharedService],
})
export class SharedModule {
    static registerKafka(service: string, consumer: string): DynamicModule {
        const providers = [
            {
                provide: service,
                useFactory: (configService: ConfigService) => {
                    const host = configService.get("KAFAKA_HOST")
                    return ClientProxyFactory.create({
                        transport: Transport.KAFKA,
                        options: {
                            client: {
                                brokers: [host],
                            },
                            consumer: {
                                groupId: consumer,
                            },
                        },
                    })
                },
                inject: [ConfigService]
            }
        ]

        return     {
            module: SharedModule,
            providers : [...providers],
            exports: providers,
        };
    }
}