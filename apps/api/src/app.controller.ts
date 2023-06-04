import { Body, Controller, Get, Inject, OnModuleInit, Param, Post, Session,Req, UseFilters, UseGuards } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from '@app/shared';
import { MailerService } from "@nestjs-modules/mailer";
@Controller()
export class AppController implements OnModuleInit {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: ClientKafka ) { }


  
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

  @Post('check')
  async check(@Body() data) {
    return this.authService.emit('check', data);
  }

  @Post('verify-email/:token')
  async verifyEmail(@Param("token") token: string) {
    return this.authService.send('verify-email', {token});
  }


  onModuleInit() {
    this.authService.subscribeToResponseOf("get-users")
    this.authService.subscribeToResponseOf("register-user")
    this.authService.subscribeToResponseOf("login-user")
    this.authService.subscribeToResponseOf("auth")
    this.authService.subscribeToResponseOf("test")
    this.authService.subscribeToResponseOf("verify-email")
  }

}
