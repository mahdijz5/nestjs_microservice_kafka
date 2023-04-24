import {  SharedService } from '@app/shared';
import { BadRequestException, Controller, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, EventPattern, KafkaContext, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtGuard } from './guards/jwt.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,
  private readonly sharedService: SharedService,) {}

  @MessagePattern('get-users')
  async getUser(@Payload() message : {id:number}) {
    try {
      const user = await this.authService.getUser(message.id)
      return {...user}
    } catch (error) {
      console.log(12314)
      throw error
    }
  }

  @MessagePattern('login-user')
  async login(@Payload() data : LoginUserDto) {
    return await this.authService.login(data)
  }

  @UseGuards(JwtGuard)
  @MessagePattern('auth')
  async auth(@Payload() data : LoginUserDto) {
    return true
  }

  @MessagePattern('register-user') 
  async createUser(@Payload() data : CreateUserDto) {

    console.log(await this.authService.createUser(data))
  }
}
