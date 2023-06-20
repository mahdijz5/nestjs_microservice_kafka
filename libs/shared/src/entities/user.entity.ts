import { RoleEntity } from '../';
import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity,  JoinColumn,  ManyToOne,  OneToMany,  OneToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserRoleEntity } from '@app/shared';


@Entity()
@Tree("closure-table", {
    closureTableName: "user_closure",
    ancestorColumnName: (column) => "ancestor_" + column.propertyName,
    descendantColumnName: (column) => "descendant_" + column.propertyName,
})
export class UserEntity  extends BaseEntity {
    @Column({
        type: "varchar",
        length: 150,
        unique: true,
        nullable : false,
    })
    email: string

    @TreeChildren()
    children: UserEntity[]

    @TreeParent()
    parent: UserEntity

    @Column({type : "bigint",default : 0})
    depth : number


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

    @BeforeInsert()
    @BeforeUpdate()
    async setDepth() {
        if (this.depth&&this.parent) {
            this.depth = +this.parent.depth+1
        }
    }   
}