import { RoleEntity } from '../';
import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity,  JoinColumn,  ManyToOne,  OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";


@Entity()
export class UserEntity  extends BaseEntity {
    @Column({
        type: "varchar",
        length: 150,
        unique: true
    })
    email: string

    @Column({
        type: "varchar",
        length: 150,
    })
    username: string

    @Column({
        type: "varchar",
    })
    password: string

    @JoinColumn()
    @ManyToOne(() => RoleEntity,(role) => role.users)
    role : RoleEntity

}