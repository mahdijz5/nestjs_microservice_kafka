import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config'
import { SharedModule } from '@app/shared';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal : true,
    envFilePath : './env'
  }),SharedModule.registerKafka("AUTH_SERVICE",process.env.KAFKA_AUTH_CONSUMER),SharedModule.registerKafka("EMAIL_SERVICE",process.env.KAFKA_EMAIL_CONSUMER)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
