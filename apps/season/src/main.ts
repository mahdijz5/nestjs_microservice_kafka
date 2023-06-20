import { NestFactory } from '@nestjs/core';
import { SeasonModule } from './season.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(SeasonModule);
  app.useGlobalPipes(new ValidationPipe())
  const configService = app.get(ConfigService); 
  const sharedService = app.get(SharedService);

  const customer = configService.get('KAFKA_SEASON_CONSUMER');

  app.connectMicroservice(sharedService.getRmqOptions(customer));
  app.startAllMicroservices();
}
bootstrap();
