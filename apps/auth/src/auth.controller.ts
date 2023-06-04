import { HttpExceptionFilter, SharedService } from '@app/shared';
import { UseFilters, Controller, UseGuards, Inject, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, EventPattern, KafkaContext, MessagePattern, Payload, RpcException, ClientKafka } from '@nestjs/microservices';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtGuard } from './guards/jwt.guard';

@UseFilters(HttpExceptionFilter)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly sharedService: SharedService  ) { }

  @MessagePattern('get-users')
  async getUser(@Payload() message: { id: number },@Session() session) {
    try {
      console.log(session)
      const user = await this.authService.getUser(message.id)
      return { ...user }
    } catch (error) {
      throw error
    }
  }

  @MessagePattern('login-user')
  async login(@Payload() data: LoginUserDto) {
    return await this.authService.login(data)
  }

  @UseGuards(JwtGuard)
  @MessagePattern('auth')
  async auth(@Payload() data: LoginUserDto) {
    return true
  }



  @MessagePattern('register-user')
  async createUser(@Payload() data: CreateUserDto) {

    console.log(await this.authService.createUser(data))
  }

  @MessagePattern('test')
  async test() {
    console.log("auth Controller2 ")
    await this.authService.test()
  }

  @MessagePattern('check')
  async test1() {
    console.log("alive. ")

  }

  // onModuleInit() {
  //   this.emailService.subscribeToResponseOf("test")
  // }

}
