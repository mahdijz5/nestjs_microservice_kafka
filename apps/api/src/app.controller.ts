import { Body, Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: ClientProxy) {}
  
  @Get('user')
  async getUsers() {
    return this.authService.emit('get-users',{sd:"Sd"});
  }

  @Get('register')
  async register(@Body() data) {
    return this.authService.emit('register-user',data);
  }

}
