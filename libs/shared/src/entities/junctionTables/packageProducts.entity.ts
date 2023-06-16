import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base.entity";
import { ProductEntity } from "../product.entity";
import { PackageEntity } from "../package.entity";


@Entity()
export class PackageProductEntity extends BaseEntity {
    @JoinColumn()
    @ManyToOne(() => PackageEntity,(pack) => pack.packageProducts)
    package : PackageEntity

    @JoinColumn()
    @ManyToOne(() => ProductEntity,(product) => product.packageProducts)
    product : ProductEntity


}