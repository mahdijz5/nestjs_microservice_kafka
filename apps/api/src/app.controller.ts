import { Body, Controller, Get, Inject, OnModuleInit, Param, Post, Session,Req, UseFilters, UseGuards, Put, Delete, Query } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from '@app/shared';
import { MailerService } from "@nestjs-modules/mailer";
import { Cron, CronExpression } from '@nestjs/schedule';
@Controller()
export class AppController implements OnModuleInit {
  constructor(@Inject('ROLE_SERVICE') private readonly roleService: ClientKafka,@Inject('AUTH_SERVICE') private readonly authService: ClientKafka,@Inject('EMAIL_SERVICE') private readonly emailService: ClientKafka ,@Inject('PRODUCT_SERVICE') private readonly productService: ClientKafka,@Inject("IPG_SERVICE") private readonly ipgService : ClientKafka) { }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async HandleMonitorGmailService() {
    this.emailService.emit("monitor-email-service",{})
  }
  
  @Get('user/:id')
  async getUsers(@Param("id") id: string) {
    try {
      return await firstValueFrom(this.authService.send('get-users', { id }))
    } catch (error) {
      throw error
    }
  }

  @Post('register')
  async register(@Body() data) {
    return this.authService.send('register-user', data);
  }

  @UseGuards(AuthGuard)
  @Post('auth')
  async auth(@Body() data) {
    return true;
  }

  @Post('login')
  async login(@Body() data) {
    return this.authService.send('login-user', data);
  }

  @Post('test')
  async test(@Body() data) {
    return this.authService.send('test', data);
  }


  @Get('reset-password/:token')
  async resetPassword(@Body() data,@Param("token") token: string) {
    return this.authService.send('reset-password', {...data,token});
  }
  @Post('forgot-password')
  async forgotPassword(@Body() data) {
    return this.authService.send('forgot-password', data);
  }

  @Get('verify-email/:token')
  async verifyEmail(@Param("token") token: string) {
    return this.authService.send('verify-email', {token});
  }


  //role
  @Get("role/get-all-roles")
  getAllRole() {
    return this.roleService.send("get-all-roles",{})
  }

  @Get("role/get-role/:id")
  getRole(@Param("id") id : string) {
    return this.roleService.send("get-role",{id})
  }
  
  @Get("role/create-role")
  createRole(data) {
    return this.roleService.send("create-get",data)
  }

  @Get("role/edit-role/:id")
  editRole(data , @Param("id") id :string) {
    return this.roleService.send("edit-role",{...data,id})
  }

  @Get("role/remove-role/:id")
  removeRole(@Param("id") id :string) {
    return this.roleService.send("remove-role",{id})
  }

  //Product
  @Get('product/get-product/:id')
  async getProduct(@Param("id") id : string) {
    return this.productService.send('get-product', {id})
  }

  @Get('product/get-package/:id')
  async getPackage(@Param("id") id : string) {
    return this.productService.send('get-package', {id})
  }

  @Get('product/create-product/:id')
  async getProductPackage(@Param("id") id : string) {
    return this.productService.send('get-package-group', {id})
  }
  
  @Get('product/get-all-product')
  async getAllProduct() {
    return this.productService.send('get-all-product', {})
  }

  @Get('product/get-all-package')
  async getAllPackage() {
    return this.productService.send('get-all-package', {})
  }

  @Get('product/create-all-product')
  async getAllProductPackage() {
    return this.productService.send('get-all-package-group', {})
  }
  
  @Post('product/create-product')
  async createProduct(@Body() data) {
    return this.productService.send('create-product', data)
  }

  @Put('product/edit-product/:id')
  async updateProduct(@Body() data,@Param("id") id : string) {
    return this.productService.send('update-product', {...data, id })
  }

  @Delete('product/remove-product/:id')
  async removeProduct(@Body() data,@Param("id") id : string) {
    return this.productService.send('remove-product', {...data, id})
  }
  @Post('product/create-package')
  async createPackage(@Body() data) {
    return this.productService.send('create-package', data)
  }

  @Put('product/edit-package/:id')
  async updatePackage(@Body() data,@Param("id") id : string) {
    return this.productService.send('update-package', {...data, id })
  }

  @Delete('product/remove-package/:id')
  async removePackage(@Body() data,@Param("id") id : string) {
    return this.productService.send('remove-package', {...data, id})
  }
  @Post('product/create-product-group')
  async createPoductGroup(@Body() data) {
    return this.productService.send('create-product-group', data)
  }

  @Put('product/edit-product-group/:id')
  async updateProductGroup(@Body() data,@Param("id") id : string) {
    return this.productService.send('update-product-group', {...data, id })
  }

  @Delete('product/remove-product-group/:id')
  async removeProductGroup(@Body() data,@Param("id") id : string) {
    return this.productService.send('remove-product-group', {...data, id})
  }

  //Ipg

  @Get("ipg/get-all-ipg")
  getAllPaymentGateway(@Query() query : {page :number, searchQuery : string}) {
    return this.ipgService.send("get-all-ipg",{ page : query.page , searchQuery : query.searchQuery,limit : 2})
  }

  @Get("ipg/get-ipg/:id")
  getPaymentGateway(@Param("id") id :string) {
    return  this.ipgService.send("get-ipg",{id})
  } 

  @Post("ipg/create-ipg") 
  createPaymentGateway(@Body() data) {
    return this.ipgService.send("create-ipg",data)
  }

  @Put("ipg/edit-ipg/:id")
  editPaymentGateway(@Param("id") id :string,@Body() data) {
    return this.ipgService.send("update-ipg",{id,...data})
  }

  @Delete("ipg/remove-ipg/:id")
  removePaymentGateway(@Param("id") id :string) {
    return this.ipgService.send("remove-ipg",{id})
  }
  

  onModuleInit() {

    const authSubscribedResponses = ["get-users","register-user","login-user","auth","verify-email","forgot-password","reset-password" ]
    const roleSubscribedResponses =  ["get-all-roles","get-role","edit-role","remove-role","create-role"]
    const ipgSubscribedResponses =  ['get-all-ipg','get-ipg','create-ipg','update-ipg','remove-ipg']
    const productSubscribedResponses = ["create-product","update-product" ,"remove-product","create-package","update-package" ,"remove-package","create-product-group","update-product-group","remove-product-group","get-product","get-package","get-product-group","get-all-product","get-all-package","get-all-product-group"]



    for(let response of authSubscribedResponses ) {
      this.authService.subscribeToResponseOf(response)
    }
    
    for(let response of roleSubscribedResponses ) {
      this.roleService.subscribeToResponseOf(response)
    }
    
    for(let response of productSubscribedResponses ) {
      this.productService.subscribeToResponseOf(response)
    }

    for(let response of ipgSubscribedResponses ) {
      this.ipgService.subscribeToResponseOf(response)
    }
  }
}
