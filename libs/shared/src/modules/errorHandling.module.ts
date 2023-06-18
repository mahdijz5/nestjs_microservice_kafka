import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport,KafkaOptions } from '@nestjs/microservices';

import { SharedService } from '../shared.service';
import { ERR } from '../enums/error.enum';

@Module({
    imports: [],
      providers: [],
})
export class ErrorHandlingModule {

         getError(err : ERR) : {key : string, value : string} {
            return JSON.parse(err)
         }
}