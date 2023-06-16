import {  Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";
import { UserRoleEntity } from "./junctionTables/userRole.entity";


@Entity()
export class RoleEntity  extends BaseEntity {
    @Column({
        length : 50,
        unique : true,
        nullable : false,
    })
    name : string

    @Column({
        type : "simple-array",
    })
    access : string[]

    @OneToMany(() => UserRoleEntity,(userRole) => userRole.role)
    userRoles : UserRoleEntity[]
}