import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ProductEntity } from "./product.entity";


@Entity()
export class PackageVersionEntity extends BaseEntity {
    @Column({
        nullable : false,
    })
    price : number
    
    products : ProductEntity
}