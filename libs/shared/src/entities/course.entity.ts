import {  Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";


@Entity()
export class CourseEntity extends BaseEntity {
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
    type: "calculation" | "beginnig"

}