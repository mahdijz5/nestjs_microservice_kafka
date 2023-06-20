import {  Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";


@Entity()
export class SeasonEntity extends BaseEntity {
    @Column({
        unique : true,
        type : "varchar"
    })
    name : string
    
    @Column({
        type: "varchar",
    })
    from: string

    @Column({
        type: "varchar",
    })
    to: string

    @Column({
        type: "varchar",
    })
    type: "calculation" | "beginning"


    @Column({type : "int2"})
    rate :number

}