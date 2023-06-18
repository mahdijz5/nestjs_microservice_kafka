import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config'
import { SharedModule } from '@app/shared';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(),ConfigModule.forRoot({
    isGlobal : true,
    envFilePath : './env'
  }),
  SharedModule.registerKafka("AUTH_SERVICE",process.env.KAFKA_AUTH_CONSUMER),
  SharedModule.registerKafka("EMAIL_SERVICE",process.env.KAFKA_EMAIL_CONSUMER),
  SharedModule.registerKafka("PRODUCT_SERVICE",process.env.KAFKA_PRODUCT_CONSUMER),
  SharedModule.registerKafka("ROLE_SERVICE",process.env.KAFKA_ROLE_CONSUMER),
  SharedModule.registerKafka("IPG_SERVICE",process.env.KAFKA_IPG_CONSUMER)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
