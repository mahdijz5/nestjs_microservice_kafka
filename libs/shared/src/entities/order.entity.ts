import {  Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { PackageVersionEntity } from "./packageVersion.entity";
import { PaymentGatewayEntity } from "./paymentGateway.entity";

enum Type {
    Online  = "Online",
    Wallet = "Wallet",
    Other = "Other"
  }


@Entity()
export class OrderEntity extends BaseEntity {
    @JoinColumn()
    @ManyToOne(() => PackageVersionEntity,(ver) => ver.order,{onDelete : "SET NULL"})
    packageVersion : PackageVersionEntity

    @Column({type : "varchar"})
    type: Type

    @Column()
    id_payment : string

    // @ManyToOne(() => PaymentGatewayEntity, (gateway) => gateway.order,{onDelete : "SET NULL"})
    // payment_gatway : PaymentGatewayEntity
}