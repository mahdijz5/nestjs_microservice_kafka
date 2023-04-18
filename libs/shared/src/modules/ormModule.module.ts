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
                port : parseInt(configService.get("DB_PORT")),
                username : configService.get("DB_USERNAME"),
                password : configService.get("DB_PASSWORD"),
                database : configService.get("DB_NAME")
            }),
            inject : [ConfigService]
        })
    ],
    providers: [SharedService],
    exports: [SharedService],
})
export class OrmModule { }