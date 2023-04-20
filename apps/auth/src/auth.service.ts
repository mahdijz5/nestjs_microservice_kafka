import { UserRepositoryInterface } from '@app/shared';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(@Inject('UsersRepositoryInterface') private readonly usersRepository: UserRepositoryInterface) { }
  
  async createUser(data){
    const user = this.usersRepository.create(data)
    return await this.usersRepository.save(user)
  }
}
