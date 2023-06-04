import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";


@Entity()
export class EmailEntity extends BaseEntity {
    @Column({
        type: "varchar",
        length: 150,
    })
    address: string

    @Column({
        type: "varchar",
    })
    subject: string

    @Column({
        type: "varchar",
    })
    content: string

}