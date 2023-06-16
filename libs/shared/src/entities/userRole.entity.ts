import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";
import { RoleEntity } from "./role.entity";

@Entity()
export class UserRoleEntity  extends BaseEntity {

    @JoinColumn()
    @ManyToOne(() => RoleEntity,(role) => role.userRoles)
    role : RoleEntity

    @JoinColumn()
    @ManyToOne(() => UserEntity,(user) => user.userRoles)
    user : UserEntity

}