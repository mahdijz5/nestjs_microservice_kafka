import { EmailRepositoryInterface } from '@app/shared';
import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { sendEmailParams } from './utils/types';
import * as ping  from 'ping';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class EmailService {
  constructor(@Inject('EmailRepositoryInterface') private readonly usersRepository: EmailRepositoryInterface,private mailerService: MailerService) {}
  async sendEmail(data : sendEmailParams) {
    try {
      await this.handlePersistEmail(data);
        // await this.mailerService.sendMail({
        //     to: data.address,
        //     subject: data.subject,
        //     html : data.content
        // })
  
    } catch (error) {
    }
  }

  private async handlePersistEmail(data : sendEmailParams) {
    try {
      await this.usersRepository.create(data)
      await this.monitorGmailService();
    } catch (error) {
      throw error
    }
  }

  @Cron('*/10 * * * * *')
  private async monitorGmailService() {
    console.log("yyooo")
    const isServiceAvailable = await this.MonitorGmailService();
    console.log(isServiceAvailable)
    if (isServiceAvailable) {
      // Service is up, handle accordingly
    } else {
      // Service is down, handle accordingly
    }
  }


  private async MonitorGmailService(): Promise<boolean> {
    const gmailHost = 'smtp.gmail.com';
    const response = await ping.promise.probe(gmailHost);

    return response.alive;
  }

}
