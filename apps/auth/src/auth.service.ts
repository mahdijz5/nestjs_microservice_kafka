import { UserRepositoryInterface } from '@app/shared';
import { Injectable, Inject, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka } from '@nestjs/microservices';
import {CACHE_MANAGER} from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateUserParams } from './types';
import { EmailParams } from '@app/shared/types';

@Injectable()
export class AuthService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,@Inject('UsersRepositoryInterface') private readonly usersRepository: UserRepositoryInterface, private jwtService: JwtService,@Inject('EMAIL_SERVICE') private readonly emailService: ClientKafka ) { }
  

  async getUser(id: number){
    const user =await this.usersRepository.findOneById(id)
    if(!user) {
      throw new NotFoundException("User not found.")
    }
    return user
  }


  async handleCreateUser(data : CreateUserParams){
    const isExist = await this.usersRepository.findByCondition({where :{email : data.email}})
    if(isExist) {
      throw new BadRequestException()
    }

    await this.cacheManager.set("userData",data)
    await this.sendVerificationEmail({email : data.email , username : data.username})
  
  }

  async login(data : LoginUserDto){
    try {
      const user =await this.usersRepository.findByCondition({where : {email : data.email}})
      if(!user) {
        throw new UnauthorizedException("Password or email is incorrect.")
      }
      if(user.password !== data.password) {
        throw new UnauthorizedException("Password or email is incorrect.")
      }

      return this.generateToken(user)
    } catch (error) {
        throw error
    }
  }

  generateToken(user ) {
    return {
        accessToken: this.jwtService.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            roles : user.userRoleRl?.roles
        }, { secret: process.env.ACCESS_TOKRN_SECRET }),
        refreshToken: this.jwtService.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            roles : user.userRoleRl?.roles
        },
            { secret: process.env.REFRESH_TOKEN_SECRET })
    }
}


  async sendVerificationEmail(data : {email : string, username :string}) {
    let emailDetail : EmailParams | any = {}
    const jwtToken = await  this.jwtService.sign({
      username: data.username,
      email: data.email,
    },{secret : process.env.VERIFICATION_EMAIL_TOKEN_SECRET,expiresIn : "10m"})
    
    emailDetail.address = data.email;
    emailDetail.subject = "no reply"
    emailDetail.content = `${process.env.SERVER_URL}/verify-email/${jwtToken}`

    this.emailService.emit("send-email",emailDetail) 
  }

  async verifyEmailByToken(token : string) {
    try {
      await this.jwtService.verify(token , {
        secret : process.env.VERIFICATION_EMAIL_TOKEN_SECRET
      })
      await this.createUser()
    } catch (error) {
      throw error
    }
  }

  async createUser() {
    try {
      const userDate :CreateUserParams= await this.cacheManager.get("userData")
      const user =  this.usersRepository.create(userDate)
      await this.usersRepository.save(user);
    } catch (error) {
      throw error
    }
  }

}
