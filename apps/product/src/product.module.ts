import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { OrmModule, PackageEntity, PackageProductEntity, PackageProductRepository, PackageRepository, PackageVersionEntity, PackageVersionRepository, ProductEntity, ProductGroupEntity, ProductGroupRepository, ProductRepository, SharedModule } from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ SharedModule,
    OrmModule,
    TypeOrmModule.forFeature([ProductEntity,PackageProductEntity,PackageEntity,PackageVersionEntity,ProductGroupEntity])],
  controllers: [ProductController],
  providers: [ProductService,
  {
    provide : "PackageRepositoryInterface",
    useClass : PackageRepository
  },{
    provide : "PackageVersionRepositoryInterface",
    useClass : PackageVersionRepository
  },{
    provide : "PackageProductsRepositoryInterface",
    useClass : PackageProductRepository
  },{
    provide : "ProductRepositoryInterface",
    useClass : ProductRepository
  },{
    provide : "ProductGroupRepositoryInterface",
    useClass : ProductGroupRepository
  }], 
})
export class ProductModule {}
