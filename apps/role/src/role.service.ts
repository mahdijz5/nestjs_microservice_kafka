import { RoleEntity, RoleRepositoryInterface } from '@app/shared';
import { Injectable,Inject ,BadRequestException,NotFoundException} from '@nestjs/common';
import { GetAppropriateRoleDto } from './dto/getAppropriateRole.dto';
import { Any } from 'typeorm';
import { CreateRoleParams, UpdateRoleParams } from './utils/types';

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

  async getAllRole() {
    try {
      const roles = await this.roleRepository.findAll()
      return roles
    } catch (error) {
      throw error
    }
  }

  async getRole(id : number) {
    try {
      const role = await this.roleRepository.findByCondition({where : {id},relations : {userRoles : {user : true}}})
      return role      
    } catch (error) {
      throw error
    }
  }

  async createRole(data : CreateRoleParams) {
    try {
      const isExist = await this.roleRepository.findByCondition({where : {name : data.name}})
      if(isExist) throw new BadRequestException()

      const role = this.roleRepository.create(data);
      
      return await this.roleRepository.save(role)
    } catch (error) {
      throw error
    }
  }

  async editRole(data : UpdateRoleParams) {
    try {
      const role = await this.roleRepository.findByCondition({where : {id : data.id}})
      if(!role) throw new NotFoundException()

      return await this.roleRepository.save({
        ...role,
        ...data
      })
    } catch (error) {
      throw error
    }
  }

  async removeRole(id :number) {
    try {
      const role = await this.roleRepository.findByCondition({where : {id}})
      if(!role) throw new NotFoundException()

      return await this.roleRepository.remove(role)
    } catch (error) {
      throw error
    }
  }

}
