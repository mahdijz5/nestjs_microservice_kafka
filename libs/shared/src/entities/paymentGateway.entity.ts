import {  Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { PackageVersionEntity } from "./packageVersion.entity";
import { OrderEntity } from "./order.entity";
 

@Entity()
export class PaymentGatewayEntity extends BaseEntity {

    @OneToMany(() => OrderEntity, (order) => order.payment_gatway)
    order : OrderEntity[]

    @Column()
    name : string
    
    
    @Column()
    slug: string
    
    
    @Column({type : "boolean",default : true})
    status : boolean
}