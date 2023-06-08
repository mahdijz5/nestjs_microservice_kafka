import { Body, Controller, Get, Inject, OnModuleInit, Param, Post, Session,Req, UseFilters, UseGuards } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from '@app/shared';
import { MailerService } from "@nestjs-modules/mailer";
import { Cron, CronExpression } from '@nestjs/schedule';
@Controller()
export class AppController implements OnModuleInit {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: ClientKafka,@Inject('EMAIL_SERVICE') private readonly emailService: ClientKafka ) { }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async HandleMonitorGmailService() {
    console.log("check")
    this.emailService.emit("monitor-email-service",{})
  }
  
  @Get('user/:id')
  async getUsers(@Param("id") id: number) {
    try {
      return await firstValueFrom(this.authService.send('get-users', { id }))
    } catch (error) {
      throw error
    }
  }

  @Post('register')
  async register(@Body() data) {
    return this.authService.send('register-user', data);
  }

  @UseGuards(AuthGuard)
  @Post('auth')
  async auth(@Body() data) {
    return true;
  }

  @Post('login')
  async login(@Body() data) {
    return this.authService.send('login-user', data);
  }

  @Post('test')
  async test(@Body() data) {
    return this.authService.send('test', data);
  }


  @Get('reset-password/:token')
  async resetPassword(@Body() data,@Param("token") token: string) {
    return this.authService.send('reset-password', {...data,token});
  }
  @Post('forgot-password')
  async forgotPassword(@Body() data) {
    return this.authService.send('forgot-password', data);
  }

  @Get('verify-email/:token')
  async verifyEmail(@Param("token") token: string) {
    return this.authService.send('verify-email', {token});
  }


  onModuleInit() {

    const subscribedResponses = ["get-users","register-user","login-user","auth","verify-email","forgot-password","reset-password"]

    for(let response of subscribedResponses ) {
      this.authService.subscribeToResponseOf(response)
    }
  }

}
