import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: ClientProxy) {}
  
  @Get('users')
  async getUsers() {
    return this.authService.emit('get-users',{sd:"Sd"});
  }

}
