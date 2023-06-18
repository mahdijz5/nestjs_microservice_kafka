import { HttpExceptionFilter, SharedService } from '@app/shared';
import { UseFilters, Controller, UseGuards, Inject, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, EventPattern, KafkaContext, MessagePattern, Payload, RpcException, ClientKafka } from '@nestjs/microservices';
import { CreateUserDto, LoginUserDto, ResetPasswordDto } from './dto';
import { JwtGuard } from './guards/jwt.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@UseFilters(HttpExceptionFilter)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly sharedService: SharedService ,) { }

  @MessagePattern('get-users')
  async getUser(@Payload() message: { id: string },@Session() session) {
    try {
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
    try {
      return await this.authService.handleCreateUser(data)
    } catch (error) {
      throw error
    }
  }

  @MessagePattern('verify-email')
  async verifyEmail(@Payload() data: {token : string}) {
    try {
      return await this.authService.verifyEmailByToken(data.token)
    } catch (error) {
      throw error
    }
  }
 
  @MessagePattern("forgot-password")
  async handleFrogotPassword(@Payload() data : ForgotPasswordDto){
    try {
      return await this.authService.handleForgotPassword(data)
    } catch (error) {
      throw error
    }
  } 
  @MessagePattern("reset-password")
  async resetPassword(@Payload() data : ResetPasswordDto){
    try {
      return await this.authService.handleResettingPassword(data)
    } catch (error) {
      throw error
    }
  } 

  // onModuleInit() {
  //   this.emailService.subscribeToResponseOf("test")
  // }

}
