import {  Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";


@Entity()
export class RoleEntity  extends BaseEntity {
    @Column({
        length : 50,
        unique : true
    })
    name : string

    @OneToMany(() => UserEntity,(user) =>user.role)
    users: UserEntity[]
}