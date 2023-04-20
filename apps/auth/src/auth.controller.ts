import { SharedService } from '@app/shared';
import { Controller, Get, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,
  private readonly sharedService: SharedService,) {}

  @MessagePattern('get-users')
  async getUsers(@Ctx() context: KafkaContext,@Payload() message) {
    this.sharedService.acknowledgeMessage(context);
    console.log(23)
  }

  @MessagePattern('register-user')
  async createUser(@Ctx() context: KafkaContext,@Payload() data) {
    console.log(await this.authService.createUser(data))
  }
}
