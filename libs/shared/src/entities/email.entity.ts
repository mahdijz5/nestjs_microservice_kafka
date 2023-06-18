import {  Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";


@Entity()
export class EmailEntity extends BaseEntity {
    @Column({
        type: "varchar",
        length: 150,
        nullable : false,
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