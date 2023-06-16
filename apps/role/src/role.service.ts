import { RoleEntity, RoleRepositoryInterface } from '@app/shared';
import { Injectable,Inject } from '@nestjs/common';
import { GetAppropriateRoleDto } from './dto/getAppropriateRole.dto';
import { Any } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(@Inject('RoleRepositoryInterface') private readonly roleRepository: RoleRepositoryInterface){}


  async getAppropriateRole(data : GetAppropriateRoleDto) : Promise<RoleEntity[]> {
    try {
      if(data.role.length <= 0 ) {
        return await this.roleRepository.findAll({
          where : {
            name : "user"
          }
        })
      }
    
        const role = await this.roleRepository.findAll({
          where : {
            name : Any([...data.role])
          }
        })

        if(!role || role.length > 0) {
          return await this.roleRepository.findAll({
            where : {
              name : "user"
            }
          })
        }
        
        return role
      
    
    } catch (error) {
      throw error
    }
  }

}
