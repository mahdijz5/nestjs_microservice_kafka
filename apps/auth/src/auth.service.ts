import { firstValueFrom } from 'rxjs';
import { RoleEntity, UserRepositoryInterface, UserRoleRepositoryInterface } from '@app/shared';
import { Injectable, Inject, BadRequestException, NotFoundException, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { LoginUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka } from '@nestjs/microservices';
import {CACHE_MANAGER} from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateUserParams, ForgotPasswordParams, ResetPasswordParams } from './types';
import { EmailParams } from '@app/shared/types';
import {generate} from 'shortid';

@Injectable()
export class AuthService   {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,@Inject('UsersRepositoryInterface') private readonly usersRepository: UserRepositoryInterface,@Inject('UserRolesRepositoryInterface') private readonly userRolesRepository: UserRoleRepositoryInterface, private jwtService: JwtService,@Inject('EMAIL_SERVICE') private readonly emailService: ClientKafka,@Inject('ROLE_SERVICE') private readonly roleService: ClientKafka ) {}
  

  async getUser(id: string){
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
    const tokenId = generate();

    await this.cacheManager.set(`userData-${tokenId}-${data.username}`,data)
    await this.sendVerificationEmail({email : data.email , username : data.username,tokenId, address : `${process.env.SERVER_URL}/verify-email`})
  
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

  async createUser(token : {tokenId : string, username : string}) {
    try {
      const userData :CreateUserParams= await this.cacheManager.get(`userData-${token.tokenId}-${token.username}`)
      
      const user =  this.usersRepository.create(userData)
      await this.usersRepository.save(user);
      
      this.roleService.emit("get-appropriate-role",{role : userData?.role || [] , user})
                
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


  async verifyEmailByToken(token : string) {
    try {
      const decoded = await this.jwtService.verify(token , {
        secret : process.env.VERIFICATION_EMAIL_TOKEN_SECRET
      })

      await this.createUser(decoded)
    } catch (error) {
      throw error
    }
  }


  async handleForgotPassword(data : ForgotPasswordParams) {
    const user =await this.usersRepository.findByCondition({
      where : {email : data.email}
    })
    if(!user) throw new NotFoundException()

    this.sendVerificationEmail({email : data.email,username : user.username,address:`${process.env.SERVER_URL}/reset-password`})
  }

  async handleResettingPassword(data : ResetPasswordParams) {
    try {
      if(data.confirmPassword != data.password) throw new BadRequestException();

      const decoded = await this.jwtService.verify(data.token , {
        secret : process.env.VERIFICATION_EMAIL_TOKEN_SECRET
      })
      const user =await this.usersRepository.findByCondition({
        where : {email : decoded.email}
      })

      user.password = data.password

      return await this.usersRepository.save(user);

    } catch (error) {
      throw error
    }
  }
  
  async sendVerificationEmail(data : {email : string, username :string,address, tokenId?: string }) {
    let emailDetail : EmailParams | any = {}
    const jwtToken = await  this.jwtService.sign({
      username: data.username,
      email: data.email,
      tokenId : data.tokenId || ""
    },{secret : process.env.VERIFICATION_EMAIL_TOKEN_SECRET,expiresIn : "10m"})
    
    emailDetail.address = data.email;
    emailDetail.subject = "no reply"
    emailDetail.content = `<h1>Hello ${data.username}</h1></br><a href="${data.address}/${jwtToken}">Link</a> `

    this.emailService.emit("send-email",emailDetail) 
  }


}
