import { SharedService } from '@app/shared';
import { Controller, Get, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, KafkaContext, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService, @Inject('SharedServiceInterface')
  private readonly sharedService: SharedService,) {}

  @MessagePattern('get-users')
  async getUsers(@Ctx() context: KafkaContext) {
    this.sharedService.acknowledgeMessage(context);

    console.log("auth controller")
    return "test"
  }
}
