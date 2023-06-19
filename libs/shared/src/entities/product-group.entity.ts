import { BeforeRemove, Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { PackageEntity } from "./package.entity";


@Entity()
export class ProductGroupEntity extends BaseEntity {
    @Column({
        nullable : false,
        length : 150,
        unique : true
    })
    title : string

    @JoinColumn()
    @OneToMany(() =>PackageEntity, (p) => p.group )
    packages : PackageEntity[]

}