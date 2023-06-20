import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

export enum seasonType {
    CALCULATED = "calculated",
    BEGINNING = "beginning"
}

@Entity()
export class SeasonEntity extends BaseEntity {
    @Column({
        type: "timestamp",
        default : new Date().toISOString()
    })
    from: Date

    @Column({
        type: "timestamp",
        default : new Date().toISOString()
    })
    to: Date

    @Column({
        type: "enum",
        enum : seasonType,
        default : seasonType.BEGINNING
    })
    type: "calculated" | "beginning"
}