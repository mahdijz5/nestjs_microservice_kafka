import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { PackageProductEntity } from  "@app/shared";


@Entity()
export class ProductEntity extends BaseEntity {
    @Column({
        length : 150,
        type : "varchar",
        unique : true,
        nullable : false,
    })
    title :string

    @OneToMany(() => PackageProductEntity,(packageProduct) => packageProduct.product)
    packageProducts : PackageProductEntity[]
    
}