import { PaymentGatewayRepositoryInterface } from '@app/shared/interfaces/paymentGateway.repository.interface';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AcceptPaymentParams, AcceptPaymentResultParams, CreateIpgParams, CreatePaymentParams, PaymentCallbackParms, RequsetPaymentParams, RequsetPaymentResultParams, UpdateIpgParams, searchPgParams } from './utils/type';
import { HttpService } from "@nestjs/axios"
import { AxiosResponse } from "axios"
import { PackageVersionRepositoryInterface } from '@app/shared';
import { firstValueFrom } from 'rxjs';
import { OrderRepositoryInterface } from '@app/shared/interfaces/order.repository.interface';
import { TempOrderRepositoryInterface } from '@app/shared/interfaces/temp-order.repository.interface';

@Injectable()
export class IpgService {
  constructor(  @Inject("PaymentGatewayRepositoryInterface") private readonly ipgRepository: PaymentGatewayRepositoryInterface, private readonly httpService: HttpService, @Inject("PackageVersionRepositoryInterface") private readonly packageVersionRepository: PackageVersionRepositoryInterface ,@Inject("OrderRepositoryInterface") private readonly orderRepository : OrderRepositoryInterface,@Inject("TempOrderRepositoryInterface") private readonly tempOrderRepository :TempOrderRepositoryInterface) { }

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

  async removePaymentGateway(id: string) {
    try {
      const ipg = await this.ipgRepository.findOneById(id)
      if (!ipg) throw new NotFoundException()

      return await this.ipgRepository.remove(ipg)
    } catch (error) {
      throw error
    }
  }


  async createPayment(data: CreatePaymentParams) {
    try {
      const packageVersion = await this.packageVersionRepository.findOneById(data.packageVersionId)
      if (!packageVersion) throw new NotFoundException()

      
      const paymentResult :AxiosResponse<RequsetPaymentResultParams> = await firstValueFrom(this.httpService.post("https://gateway.zibal.ir/request/lazy", <RequsetPaymentParams>{
        merchant: process.env.MERCHANT,
        amount: packageVersion.price,
        callbackUrl: `${process.env.SERVER_URL}/ipg/payment-result`,
        sms: true,
        mobile: "09222425546",
      }))

      const tempOrder =  this.tempOrderRepository.create({packageVersion,type : "online",id_payment : paymentResult.data.trackId})
      await this.tempOrderRepository.save(tempOrder)

      return `https://gateway.zibal.ir/start/${paymentResult.data.trackId}`

    } catch (error) {
      throw error
    }
  }

  async acceptPayment(data: PaymentCallbackParms) {
    try {
      const result: AxiosResponse<AcceptPaymentResultParams> = await firstValueFrom(this.httpService.post("https://gateway.zibal.ir/verify", <AcceptPaymentParams>{
        merchant: process.env.MERCHANT,
        trackId: data.trackId
      }))

      await this.persistOrder(data.trackId)

      return result

    } catch (error) {
      throw error
    }
  }

  async persistOrder(id_payment : string) {
      const tempOrder = await this.tempOrderRepository.findByCondition({where :{ id_payment},relations : {packageVersion : true}})

      const order = this.orderRepository.create({...tempOrder})
      await this.orderRepository.save(order)
      await this.tempOrderRepository.remove(tempOrder)
  }

}
