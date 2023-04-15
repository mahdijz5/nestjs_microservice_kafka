import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import {ConfigService} from '@nestjs/config'
import { MicroserviceOptions,Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService)

  app.connectMicroservice<MicroserviceOptions>({
    transport : Transport.KAFKA,
    options :{
      client : {
        brokers : ['localhost:9092']
      },
      consumer : {
        groupId : "auth-consumer"
      }
    }
  })
}
bootstrap();
