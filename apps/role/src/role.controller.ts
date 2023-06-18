import { Controller, Get, UseFilters } from '@nestjs/common';
import { RoleService } from './role.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetAppropriateRoleDto } from './dto/getAppropriateRole.dto';
import { HttpExceptionFilter } from '@app/shared';
import { CreateRoleDto } from './dto/createRole.dto';
import { UpdateRoleDto } from './dto/updateRole.dto';

@UseFilters(HttpExceptionFilter)
@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern("get-appropriate-role")
  async getAppropriateRole(@Payload() data : GetAppropriateRoleDto) {
    try {
      return {...await this.roleService.getAppropriateRole(data)}
    } catch (error) {
      throw error
    }
  }
  @MessagePattern("get-all-roles")
  async getAllRoles(@Payload() data : GetAppropriateRoleDto) {
    try {
      return {...await this.roleService.getAllRole()}
    } catch (error) {
      throw error
    }
  }
  @MessagePattern("get-role")
  async getRole(@Payload() data : {id :number}) {
    try {
      return {...await this.roleService.getRole(data.id)}
    } catch (error) {
      throw error
    }
  }
  @MessagePattern("create-role")
  async createRole(@Payload() data : CreateRoleDto) {
    try {
      return {...await this.roleService.createRole(data)}
    } catch (error) {
      throw error
    }
  }
  @MessagePattern("edit-role")
  async editRole(@Payload() data : UpdateRoleDto) {
    try {
      return {...await this.roleService.editRole(data)}
    } catch (error) {
      throw error
    }
  }
  @MessagePattern("remove-role")
  async removeRole(@Payload() data : {id :number}) {
    try {
      return {...await this.roleService.removeRole(data.id)}
    } catch (error) {
      throw error
    }
  }

}
