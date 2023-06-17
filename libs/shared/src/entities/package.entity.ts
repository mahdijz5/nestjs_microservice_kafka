import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ProductGroupEntity ,PackageProductEntity ,PackageVersionEntity} from "@app/shared";


@Entity()
export class PackageEntity extends BaseEntity {
    @Column({
        length : 150,
        type : "varchar",
        unique : true,
    })
    title :string

    @Column({
        default : 0,
    })
    rate :number

    @OneToMany(() => PackageProductEntity,(packageProduct) => packageProduct.package)
    packageProducts : PackageProductEntity[]

    @JoinColumn()
    @OneToMany(()=>PackageVersionEntity,(packageVersion) => packageVersion.package)
    packageVersion : PackageVersionEntity[]

    @ManyToOne(() => ProductGroupEntity , (productGroup) => productGroup.packages, {onDelete : "SET NULL"})
    group : ProductGroupEntity
}