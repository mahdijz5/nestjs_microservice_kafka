import { EmailRepositoryInterface } from '@app/shared';
import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { EmailParams } from '@app/shared/types';
import {PingResponse,promise,sys} from 'ping';

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
    monitorGmailService() {
      let emailServiceStatus : boolean
      sys.probe("108.177.126.109",(isAlive,error) => {
        if(error) throw error
        emailServiceStatus = isAlive
          if(emailServiceStatus && !this.perviousEmailServiceStatus) { 
            this.sendPersistedEmails()
          }
        this.perviousEmailServiceStatus = emailServiceStatus
      });
  }




}
