import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import {ConfigService} from '@nestjs/config'
import { MicroserviceOptions,Transport } from '@nestjs/microservices';
import { SharedService } from '@app/shared';
import {ValidationPipe} from "@nestjs/common"



async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(new ValidationPipe())
  const configService = app.get(ConfigService); 
  const sharedService = app.get(SharedService);
 
  const customer = configService.get('KAFKA_AUTH_CONSUMER');
  
  app.connectMicroservice(sharedService.getRmqOptions(customer));
  app.startAllMicroservices();

}
bootstrap();
