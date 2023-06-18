import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, Get, UseFilters } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { CreateProductGroupDto } from './dto/craete-product-group.dto';
import { UpdateProductGroupDto } from './dto/update-productGroup.dto';
import { HttpExceptionFilter } from '@app/shared';

@UseFilters(new HttpExceptionFilter)
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern("get-product")
  async getProduct(@Payload() data : {id : number}) {
    try {
      return {...await this.productService.getProduct(data.id)}
    } catch (err) {
      throw err
    }
  }
  @MessagePattern("get-package")
  async getPacakge(@Payload() data : {id : number}) {
    try {
      return {...await this.productService.getPackage(data.id)}
    } catch (err) {
      throw err
    }
  }
  @MessagePattern("get-product-group")
  async getProductGroup(@Payload() data : {id : number}) {
    try {
      return {...await this.productService.getProductGroup(data.id)}
    } catch (err) {
      throw err
    }
  }

  @MessagePattern("get-all-product")
  async getAllProduct() {
    try {
      return {...await this.productService.getAllProduct()}
    } catch (err) {
      throw err
    }
  }
  @MessagePattern("get-all-package")
  async getAllPacakge() {
    try {
      return {...await this.productService.getAllPackage()}
    } catch (err) {
      throw err
    }
  }
  @MessagePattern("get-product-all-group")
  async getAllProductGroup() {
    try {
      return {...await this.productService.getAllProductGroup()}
    } catch (err) {
      throw err
    }
  }
  @MessagePattern("create-product")
  async createProduct(@Payload() data : CreateProductDto) {
    try {
      return {...await this.productService.createProduct(data)}
    } catch (err) {
      throw err
    }
  }


  @MessagePattern("update-product")
  async updateProduct(@Payload() data : UpdateProductDto) {
    try {
      return {...await this.productService.updateProduct(data)}
    } catch (err) {
      throw err
    }
  }

  @MessagePattern("remove-product")
  async deleteProduct(@Payload() data : {id :number}) {
    try {
      return {...await this.productService.deleteProduct(data.id)}
    } catch (err) {
      throw err
    }
  }

  @MessagePattern("create-package")
  async createPackage(@Payload() data : CreatePackageDto) {
    try {
      return {...await this.productService.createPackage(data)}
    } catch (err) {
      throw err
    }
  }
  @MessagePattern("update-package")
  async updatePackage(@Payload() data : UpdatePackageDto) {
    try {
      return {...await this.productService.updatePackage(data)}
    } catch (err) { 
      throw err
    }
  }

  @MessagePattern("remove-package")
  async removePacakge(@Payload() data  : {id :number}) {
    try {
      return await this.productService.removePackage(data.id)
    } catch (err) {
      throw err
    }
  }
  
  @MessagePattern("create-product-group")
  async createProductGroup(@Payload() data : CreateProductGroupDto) {
    try {
      return {...await this.productService.createProductGroup(data)}
    } catch (err) {
      throw err
    }
  }
  @MessagePattern("update-product-group")
  async  updateProductGroup(@Payload() data : UpdateProductGroupDto) {
    try {
      return {...await this.productService.updateProductGroup(data)}
    } catch (err) {
      throw err
    }
  }
  @MessagePattern("remove-product-group")
  async removeProductGroup(@Payload() data  : {id :number}) {
    try {
      return await this.productService.removeProductGroup(data.id)
    } catch (err) {
      throw err
    }
  }
}
