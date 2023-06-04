import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern("send-email")
  sendEmail(@Payload() data ) {
    console.log("email controller ")
    return this.emailService.sendEmail(data);
  }
}
