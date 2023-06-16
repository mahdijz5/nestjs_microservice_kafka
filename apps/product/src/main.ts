import { NestFactory } from '@nestjs/core';
import {ConfigService} from '@nestjs/config'
import { SharedService } from '@app/shared';
import {ValidationPipe} from "@nestjs/common"
import { ProductModule } from './product.module';


async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  app.useGlobalPipes(new ValidationPipe())
  const configService = app.get(ConfigService); 
  const sharedService = app.get(SharedService);

  const customer = configService.get('KAFKA_PRODUCT_CONSUMER');

  app.connectMicroservice(sharedService.getRmqOptions(customer));
  app.startAllMicroservices();

}
bootstrap();
