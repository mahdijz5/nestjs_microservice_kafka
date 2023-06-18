import { NestFactory } from '@nestjs/core';
import { IpgModule } from './ipg.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(IpgModule);
  app.useGlobalPipes(new ValidationPipe())
  const configService = app.get(ConfigService); 
  const sharedService = app.get(SharedService);
 
  const customer = configService.get('KAFKA_IPG_CONSUMER');
  
  app.connectMicroservice(sharedService.getRmqOptions(customer));
  app.startAllMicroservices();
}
bootstrap();
