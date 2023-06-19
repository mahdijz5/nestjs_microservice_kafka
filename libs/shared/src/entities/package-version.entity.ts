import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { PackageEntity } from "./package.entity";
import { OrderEntity } from "./order.entity";


@Entity()
export class PackageVersionEntity extends BaseEntity {
    @Column({
        nullable : false,
    })
    price : number

    @ManyToOne(() =>PackageEntity, (p) => p.packageVersion,{onDelete : "CASCADE"})
    package : PackageEntity

    @OneToMany(() => OrderEntity,(order) => order.packageVersion)
    order : OrderEntity
}