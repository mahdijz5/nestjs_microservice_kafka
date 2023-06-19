import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base.entity";
import { UserEntity } from "@app/shared";
import { RoleEntity } from "@app/shared";

@Entity()
export class UserRoleEntity  extends BaseEntity {

   
    @JoinColumn()
    @ManyToOne(() => RoleEntity,(role) => role.userRoles,{onDelete : "CASCADE"})
    role : RoleEntity

    @JoinColumn()
    @ManyToOne(() => UserEntity,(user) => user.userRoles,{onDelete : "CASCADE"})
    user : UserEntity

}