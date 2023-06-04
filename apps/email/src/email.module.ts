import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

import { EmailEntity, EmailRepository, OrmModule, SharedModule } from '@app/shared';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [MailerModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      transport: {
        service: config.get('EMAIL_SERVICE'),
        secure: false,
        auth: {
          user: config.get('EMAIL_USER'),
          pass: config.get('EMAIL_PASSWORD'),
        },
      },
      defaults: {
        from: 'mahdi.jz.v@gmail.com'
      },
  
    }),inject: [ConfigService]}),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),
    
    SharedModule,
    OrmModule,
    TypeOrmModule.forFeature([EmailEntity])
    ],
  controllers: [EmailController],
  providers: [EmailService,
    {
      provide: 'EmailRepositoryInterface',
      useClass: EmailRepository,
    }],
})
export class EmailModule {}
