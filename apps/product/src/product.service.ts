import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductParams, UpdateProductParams, CreatePackageParams, UpdatePackageParams, UpdateProductGroupParams, CreateProductGroupParams } from './utils/type';
import { PackageEntity, PackageProductEntity, PackageProductsRepositoryInterface, PackageRepositoryInterface, PackageVersionRepositoryInterface, ProductEntity, ProductRepositoryInterface, ProductGroupRepository, ProductGroupEntity } from '@app/shared';
import { Any, DeepPartial } from 'typeorm';
import * as _ from 'lodash';
import { compareArrays, isEmpty } from './utils/tools';

@Injectable()
export class ProductService {
  constructor(@Inject("ProductRepositoryInterface") private readonly productRepository: ProductRepositoryInterface, @Inject("PackageProductsRepositoryInterface") private readonly packageProductsRepository: PackageProductsRepositoryInterface, @Inject("PackageVersionRepositoryInterface") private readonly packageVersionRepository: PackageVersionRepositoryInterface, @Inject("PackageRepositoryInterface") private readonly packageRepository: PackageRepositoryInterface, @Inject("ProductGroupRepositoryInterface") private readonly productGroupRepository: ProductGroupRepository) { }

  async getAllProduct() {
      try {
        return await this.productRepository.findAll()
      } catch (error) {
        throw error
      }
  }
  
  async getAllPackage() {
      try {
        return await this.packageRepository.findAll({relations : {packageProducts : {product  : true}}})
      } catch (error) {
        throw error
      }
  }

  async getAllProductGroup() {
      try {
        return await this.productGroupRepository.findAll({relations : {packages : {packageProducts : {product : true}}}})
      } catch (error) {
        throw error
      }
  }
  async getProduct(id :string) {
      try {
        console.log(id)
        return await this.productRepository.findByCondition( {where :{id}})
      } catch (error) {
        throw error
      }
  }
  
  async getPackage(id :string) {
      try {
        return await this.packageRepository.findByCondition({ where :{id},relations : {packageProducts : {product  : true}}})
      } catch (error) {
        throw error
      }
  }

  async getProductGroup(id :string) {
      try {
        return await this.productGroupRepository.findByCondition({ where :{id},relations : {packages : {packageProducts : {product : true}}}})
      } catch (error) {
        throw error
      }
  }

  //? Craete Product
  async createProduct(data: CreateProductParams) {
    try {
      const isExist = await this.productRepository.findByCondition({ where: { title: data.title } })
      if (isExist) throw new BadRequestException()

      const product = this.productRepository.create({ title: data.title })

      return await this.productRepository.save(product)

    } catch (error) {
      throw error
    }
  }

  //? Update product
  async updateProduct(data: UpdateProductParams) {
    try {
      const product = await this.productRepository.findByCondition({ where: { id: data.id } })

      if (!product) throw new NotFoundException()

      return await this.productRepository.save({
        ...product,
        ...data
      })

    } catch (error) {
      throw error
    }
  }


  //Remove product
  async deleteProduct(id: string) {
    try {
      const product = await this.productRepository.findByCondition({ where: { id } })
      if (!product) throw new NotFoundException()

      return await this.productRepository.remove(product)
    } catch (error) {
      throw error
    }
  }


  //? Create Package.............
  async createPackage(data: CreatePackageParams) {
    try {
      const isExist = await this.packageRepository.findByCondition({ where: { title: data.title } })
      if (isExist) throw new BadRequestException()

      const newPackage = this.packageRepository.create({ title: data.title })
      let products: ProductEntity[]

      const packageVersion = await this.packageVersionRepository.create({ price: data.price, })
      await this.packageVersionRepository.save(packageVersion)
      newPackage.packageVersion = [packageVersion]

      const createdPackage = await this.packageRepository.save(newPackage)

      if (data.productIdList.length > 0) {
        products = await this.createPackageProduct(createdPackage, data.productIdList)
      }

      return { ...newPackage, products, price: data.price }
    } catch (error) {
      throw error
    }
  }

  private async createPackageProduct(newPackage: PackageEntity, productIdList: string[]) {
    try {
      let products: ProductEntity[]
      products = await this.productRepository.findAll({ where: { id: Any(productIdList) } })
      let packageProductList = []

      for (const product of products) {
        let newPackageProducts = {} as PackageProductEntity
        newPackageProducts.package = newPackage
        newPackageProducts.product = product
        packageProductList.push(newPackageProducts)
      }

      const packageProduct = this.packageProductsRepository.createMany(packageProductList)
      await this.packageProductsRepository.saveMany(packageProduct)
      return products
    } catch (error) {
      throw error
    }
  }

  //? Update Package.............
  async updatePackage(data: UpdatePackageParams) {
    try {
      let targetedPackage = await this.packageRepository.findByCondition({ where: { id: data.id }, relations: { packageProducts: { product: true }, packageVersion: true } })
      if (!targetedPackage) throw new NotFoundException()

      targetedPackage = await this.updateProductsOfPackage(data.productIdList, { ...targetedPackage })
      targetedPackage = await this.updatePackageVersion({ ...targetedPackage }, data.price)

      return await this.packageRepository.save({
        ...targetedPackage,
        title: data.title || targetedPackage.title
      })

    } catch (error) {
      throw error
    }

  }

  private async updateProductsOfPackage(newProductIdList: string[], currentPackage: PackageEntity): Promise<PackageEntity> {
    try {
      let newPackage = { ...currentPackage }

      const CurrentProductsIdList: string[] = _.map(newPackage.packageProducts, (n) => { return n.product.id })

      const { added : addedProduct, deleted: deletedProduct } = compareArrays(CurrentProductsIdList, newProductIdList)

      if (!isEmpty(deletedProduct)) {
        const deletedPackageProducts = await this.packageProductsRepository.findAll({ where: { product: { id: Any(deletedProduct) } }, relations: { product: true } })
        for (let packageProduct of deletedPackageProducts) {
          await this.packageProductsRepository.remove(packageProduct)
        }
      }

      if (!isEmpty(addedProduct)) {
        const addedProducts = await this.productRepository.findAll({ where: { id: Any(addedProduct) } })
        for (let packageProduct of addedProducts) {
          let newPackageProduct = this.packageProductsRepository.create({ product: packageProduct, })
          newPackage.packageProducts.push(await this.packageProductsRepository.save(newPackageProduct))
        }
      }
      return newPackage
    } catch (error) {
      throw error
    }
  }

  private async updatePackageVersion(currentPackage: PackageEntity, price: number | any) {
    let newPackage = { ...currentPackage }
    
    if (parseInt(price) !== _.last(newPackage.packageVersion).price) {
      const packageVersion = await this.packageVersionRepository.create({
        package: newPackage,
        price: price
      });
      await this.packageVersionRepository.save(packageVersion)
      newPackage.packageVersion.push(packageVersion);
    }

    return newPackage
  }

  //? Remove Package.............
  async removePackage(id: string) {
    try {
      let targetedPackage = await this.packageRepository.findByCondition({ where: { id }, relations: { packageVersion: true, packageProducts: true } })
      if (!targetedPackage) throw new NotFoundException()

      await this.packageRepository.remove(targetedPackage)
    } catch (error) {
      throw error
    }
  }

  //? Create Product Group.............
  async createProductGroup(data: CreateProductGroupParams) {
    try {
      const isExist = await this.productGroupRepository.findByCondition({ where: { title: data.title } })
      if (isExist) throw new BadRequestException()

      const group = this.productGroupRepository.create({ title: data.title })

      if (!isEmpty(data.packageIdList)) {
        const packages = await this.packageRepository.findAll({ where: { id: Any(data.packageIdList) } })
        group.packages = packages
      }

      return await this.productGroupRepository.save(group)
    } catch (error) {
      throw error
    }
  }

  //? Update Product Group.............
  async updateProductGroup(data: UpdateProductGroupParams) {
    try {
      let group = await this.productGroupRepository.findByCondition({ where: { id: data.id } })
      if (!group) throw new NotFoundException()

      group = await this.updateProducstOfProductGroup(group, data.packageIdList)

      return await this.productGroupRepository.save({
        ...group,
        ...data
      })
    } catch (error) {
      throw error
    }
  }

  private async updateProducstOfProductGroup(currentProductGroup: ProductGroupEntity, newProductGroupIdList: string[]) {
    let newGroup = { ...currentProductGroup }

    const currentProductGroupIdList = _.map(currentProductGroup.packages, (n) => { return n.id })

    const { added, deleted } = compareArrays(currentProductGroupIdList, newProductGroupIdList)

    if (!isEmpty(deleted)) {
      _.remove(newGroup.packages, (n) => {
        return isEmpty(_.difference([n.id], deleted))
      })
    }

    if (!isEmpty(added)) {
      const addedPackages = await this.packageRepository.findAll({ where: { id: Any(added) } })
      newGroup.packages = _.concat(newGroup.packages, addedPackages)
    }


    return newGroup
  }


  //? Remove Product Group.............
  async removeProductGroup(id: string) {
    try {
      let group = await this.productGroupRepository.findByCondition({ where: { id: id } })
      if (!group) throw new NotFoundException()
      await this.productGroupRepository.remove(group)
    } catch (error) {
      throw error
    }
  }

}



