import { Controller, Get, UseFilters } from '@nestjs/common';
import { IpgService } from './ipg.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HttpExceptionFilter } from '@app/shared';
import { SearchIpgDto } from './dto/search-ipg.dto';
import { CreateIpgDto } from './dto/create-ipg.dto';
import { UpdateIpgDto } from './dto/update-ipg.dto';

@UseFilters(HttpExceptionFilter)
@Controller()
export class IpgController {
  constructor(private readonly ipgService: IpgService) {}
  
  @MessagePattern("get-all-ipg")
  async getAllPaymentGateway(@Payload() data : SearchIpgDto ) {
    try {
      return {...await this.ipgService.getAllPaymentGateway(data)}
    } catch (error) {
      throw error
    }
  }

  @MessagePattern("get-ipg")
  async getPaymentGateway(@Payload() data  : {id :number}) {
    try {
      return {...await this.ipgService.getPaymentGateway(data.id)}
    } catch (error) {
      throw error
    }
  }
  @MessagePattern("create-ipg")
  async createPaymentGateway(@Payload() data :CreateIpgDto) {
    try {
      return {...await this.ipgService.createPaymentGateway(data)}
    } catch (error) {
      throw error
    }
  }

  @MessagePattern("update-ipg")
  async editPaymentGateway(@Payload() data :UpdateIpgDto ) {
    try {
      return {...await this.ipgService.updatePaymentGateway(data)}
    } catch (error) {
      throw error
    }
  }

  @MessagePattern("remove-ipg")
  async removePaymentGateway(@Payload() data  : {id :number}) {
    try {
      return {...await this.ipgService.removePaymentGateway(data.id)}
    } catch (error) {
      throw error
    }
  }
 
}
