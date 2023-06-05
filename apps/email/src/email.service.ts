import { EmailRepositoryInterface } from '@app/shared';
import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import * as ping from 'ping';
import { EmailParams } from '@app/shared/types';

@Injectable()
export class EmailService {
  private perviousEmailServiceStatus = true
  constructor(@Inject('EmailRepositoryInterface') private readonly emailRepository: EmailRepositoryInterface, private mailerService: MailerService) { }
  
  async sendEmail(data: EmailParams) {
    try {
      await this.mailerService.sendMail({
        to: data.address,
        subject: data.subject,
        html: data.content
      })
    } catch (error) {
      await this.persistEmail(data);
    }
  }

  private async persistEmail(data: EmailParams) {
    try {
      const email = await this.emailRepository.create(data)
      await this.emailRepository.save(email)
    } catch (error) {
      throw error
    }
  }
  
  
  async sendPersistedEmails() {
    try {
      const emails = await this.emailRepository.findAll({
        order : {
          id : 'DESC'
        }
      })

      for(let email of emails) {
        await this.sendEmail({...email})
        await this.emailRepository.remove(email);
      }

    } catch (error) {
      throw error      
    }
  }


    // Will be called by Api 
    async MonitorGmailService() {
      const gmailHost = 'smtp.gmail.com';
      const response = await ping.promise.probe(gmailHost);
      const emailServiceStatus = response.alive

      if(emailServiceStatus && !this.perviousEmailServiceStatus) { // Time to send prisisted emails
        this.sendPersistedEmails()
      }

    this.perviousEmailServiceStatus = emailServiceStatus
  }




}
