import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { PackageProductEntity } from "./junctionTables/PackageProducts.entity";


@Entity()
export class PackageEntity extends BaseEntity {
    @Column({
        length : 5,
        default : 0,
    })
    rate :number

    @OneToMany(() => PackageProductEntity,(packageProduct) => packageProduct.package)
    packageProducts : PackageProductEntity[]
}