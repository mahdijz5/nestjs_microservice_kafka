import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport, } from '@nestjs/microservices';

import { SharedService } from '../shared.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
 
        TypeOrmModule.forRootAsync({
            useFactory: (configService:ConfigService) => ({
                type : "postgres",
                url : configService.get("POSTGRES_URI"),
                synchronize : true,
                autoLoadEntities : true,
            }),
            inject : [ConfigService]
        })
    ],
    providers: [SharedService],
    exports: [SharedService],
})
export class OrmModule { }