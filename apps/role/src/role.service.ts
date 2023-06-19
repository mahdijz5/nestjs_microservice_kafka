import { RoleEntity, RoleRepositoryInterface, UserRoleEntity, UserRoleRepositoryInterface } from '@app/shared';
import { Injectable,Inject ,BadRequestException,NotFoundException} from '@nestjs/common';
import { GetAppropriateRoleDto } from './dto/get-appropriate-role.dto';
import { Any } from 'typeorm';
import { CreateRoleParams, UpdateRoleParams } from './utils/types';
import { isEmpty } from './utils/tools';

@Injectable()
export class RoleService {
  constructor(@Inject('RoleRepositoryInterface') private readonly roleRepository: RoleRepositoryInterface,@Inject('UserRolesRepositoryInterface') private readonly userRoleRepository : UserRoleRepositoryInterface){}


  async getAppropriateRole(data : GetAppropriateRoleDto) : Promise<RoleEntity[]> {
    try {
      let roles : RoleEntity[]
  
        
        roles = await this.roleRepository.findAll({
          where : {
            name : Any([...data.role])
          }
        })

        if(isEmpty(roles)) {
          roles= await this.roleRepository.findAll({
            where : {
              name : "user"
            }
          })
        }
        
        for(let role of roles) {
          await this.userRoleRepository.save(this.userRoleRepository.create({user : data.user, role : role}))
        }
        
        return roles
      
    
    } catch (error) {
      console.log(error)
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

  async getRole(id : string) {
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

  async removeRole(id :string) {
    try {
      const role = await this.roleRepository.findByCondition({where : {id}})
      if(!role) throw new NotFoundException()

      return await this.roleRepository.remove(role)
    } catch (error) {
      throw error
    }
  }

}
