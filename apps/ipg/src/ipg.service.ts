import { PaymentGatewayRepositoryInterface } from '@app/shared/interfaces/paymentGateway.repository.interface';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIpgParams, UpdateIpgParams, searchPgParams } from './utils/type';

@Injectable()
export class IpgService {
  constructor(@Inject("PaymentGatewayRepositoryInterface") private readonly ipgRepository: PaymentGatewayRepositoryInterface) { }
  
  async getAllPaymentGateway(data: searchPgParams) {
    const limit = data.limit | 5
    const page = data.page | 1 
  
    try {
      return await this.ipgRepository.findAll({ take: limit, skip: (page - 1) * data.limit })
    } catch (error) {
      throw error
    }
  }

  async getPaymentGateway(id: string) {
    try {
      return await this.ipgRepository.findByCondition({ where: { id } })
    } catch (error) {
      throw error
    }
  }

  async createPaymentGateway(data: CreateIpgParams) {
    try {
      const isExist = await this.ipgRepository.findByCondition({ where: { name: data.name } })
      if (isExist) throw new BadRequestException()

      const ipg = this.ipgRepository.create(data)
      return await this.ipgRepository.save(ipg)
    } catch (error) {
      throw error
    }
  }

  async updatePaymentGateway(data: UpdateIpgParams) {
    try {
      const ipg = await this.ipgRepository.findByCondition({ where: { id: data.id } })
      if (!ipg) throw new NotFoundException()

      return await this.ipgRepository.save({
        ...ipg,
        ...data
      })
    } catch (error) {
      throw error
    }
  }

  async removePaymentGateway(id :string) {
    try {
      const ipg = await this.ipgRepository.findOneById(id )
      if (!ipg) throw new NotFoundException()

      return await this.ipgRepository.remove(ipg)
    } catch (error) {
      throw error
    }
  }

}
