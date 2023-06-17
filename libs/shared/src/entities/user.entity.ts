import { RoleEntity } from '../';
import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity,  JoinColumn,  ManyToOne,  OneToMany,  OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserRoleEntity } from '@app/shared';


@Entity()
export class UserEntity  extends BaseEntity {
    @Column({
        type: "varchar",
        length: 150,
        unique: true,
        nullable : false,
    })
    email: string

    @Column({
        type: "varchar",
        length: 150,
        nullable : false,
    })
    username: string

    @Column({
        type: "varchar",
        nullable : false,
    })
    password: string

    @OneToMany(() => UserRoleEntity,(userRole) => userRole.user)
    userRoles : UserRoleEntity[]

}