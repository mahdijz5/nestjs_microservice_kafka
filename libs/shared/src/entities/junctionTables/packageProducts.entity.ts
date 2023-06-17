import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base.entity";
import { PackageEntity ,ProductEntity} from "@app/shared";


@Entity()
export class PackageProductEntity extends BaseEntity {
    @JoinColumn()
    @ManyToOne(() => PackageEntity,(pack) => pack.packageProducts,{onDelete : "CASCADE"})
    package : PackageEntity

    @JoinColumn()
    @ManyToOne(() => ProductEntity,(product) => product.packageProducts,{onDelete : "CASCADE"})
    product : ProductEntity


}