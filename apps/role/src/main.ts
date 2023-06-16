import { NestFactory } from '@nestjs/core';
import { RoleModule } from './role.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(RoleModule);
  app.useGlobalPipes(new ValidationPipe())
  const configService = app.get(ConfigService); 
  const sharedService = app.get(SharedService);

  const customer = configService.get('KAFKA_ROLE_CONSUMER');

  app.connectMicroservice(sharedService.getRmqOptions(customer));
  app.startAllMicroservices();
}
bootstrap();
