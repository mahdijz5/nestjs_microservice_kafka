import { Controller, Get, UseFilters } from '@nestjs/common';
import { RoleService } from './role.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetAppropriateRoleDto } from './dto/getAppropriateRole.dto';
import { HttpExceptionFilter } from '@app/shared';

@UseFilters(HttpExceptionFilter)
@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern("get-appropriate-role")
  async getAppropriateRole(@Payload() data : GetAppropriateRoleDto) {
    try {
      return await this.roleService.getAppropriateRole(data)
    } catch (error) {
      throw error
    }
  }

}
