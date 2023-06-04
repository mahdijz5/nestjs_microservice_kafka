import { EmailRepositoryInterface } from '@app/shared';
import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import * as ping from 'ping';
import { Cron } from '@nestjs/schedule';
import { EmailParams } from '@app/shared/types';

@Injectable()
export class EmailService {
  constructor(@Inject('EmailRepositoryInterface') private readonly emailRepository: EmailRepositoryInterface, private mailerService: MailerService) { }
  async sendEmail(data: EmailParams) {
    try {
      await this.handlePersistEmail(data);
      await this.mailerService.sendMail({
        to: data.address,
        subject: data.subject,
        html: data.content
      })

    } catch (error) {

    }
  }

  private async handlePersistEmail(data: EmailParams) {
    try {
      const email = await this.emailRepository.create(data)
      await this.emailRepository.save(email)
      await this.HandleMonitorGmailService();
    } catch (error) {
      throw error
    }
  }

  @Cron('*/10 * * * * *')
  private async HandleMonitorGmailService() {
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
