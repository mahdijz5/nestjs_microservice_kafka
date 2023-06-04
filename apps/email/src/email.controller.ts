import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailParams } from '@app/shared/types';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern("send-email")
  async sendEmail(@Payload() data  : EmailParams) {
    try {
      return await this.emailService.sendEmail(data);
    } catch (error) {
      throw error 
    }
  }
}
