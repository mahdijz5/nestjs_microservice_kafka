import { NestFactory } from '@nestjs/core';
import { EmailModule } from './email.module';
import {ConfigService} from '@nestjs/config'
import { SharedService } from '@app/shared';
import {ValidationPipe} from "@nestjs/common"


async function bootstrap() {
  const app = await NestFactory.create(EmailModule);
  app.useGlobalPipes(new ValidationPipe())
  const configService = app.get(ConfigService); 
  const sharedService = app.get(SharedService);

  const customer = configService.get('KAFKA_EMAIL_CONSUMER');

  app.connectMicroservice(sharedService.getRmqOptions(customer));
  app.startAllMicroservices();

}
bootstrap();
