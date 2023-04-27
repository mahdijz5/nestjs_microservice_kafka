import { Body, Controller, Get, Inject, OnModuleInit, Param, Post, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController implements OnModuleInit {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: ClientKafka) { }

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

  @Post('login')
  async login(@Body() data) {
    return this.authService.send('login-user', data);
  }


  onModuleInit() {
    this.authService.subscribeToResponseOf("get-users")
    this.authService.subscribeToResponseOf("register-user")
    this.authService.subscribeToResponseOf("login-user")
    this.authService.subscribeToResponseOf("auth")
  }

}
