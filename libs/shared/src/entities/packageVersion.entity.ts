import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { PackageEntity } from "./package.entity";


@Entity()
export class PackageVersionEntity extends BaseEntity {
    @Column({
        nullable : false,
    })
    price : number

    @ManyToOne(() =>PackageEntity, (p) => p.packageVersion,{onDelete : "CASCADE"})
    package : PackageEntity
}