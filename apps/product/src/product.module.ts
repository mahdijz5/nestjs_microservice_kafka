import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { OrmModule, PackageEntity, PackageProductEntity, PackageProductRepository, PackageRepository, PackageVersionEntity, ProductEntity, ProductRepository, SharedModule } from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ SharedModule,
    OrmModule,
    TypeOrmModule.forFeature([ProductEntity,PackageEntity,PackageProductEntity,PackageVersionEntity])],
  controllers: [ProductController],
  providers: [ProductService,
  {
    provide : "PackageRepositoryInterface",
    useClass : PackageRepository
  },{
    provide : "PackageVersionRepositoryInterface",
    useClass : PackageVersionEntity
  },{
    provide : "PackageProductsRepositoryInterface",
    useClass : PackageProductRepository
  },{
    provide : "ProductRepositoryInterface",
    useClass : ProductRepository
  }],
})
export class ProductModule {}
