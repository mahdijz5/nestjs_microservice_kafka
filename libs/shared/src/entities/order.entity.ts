import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { PackageVersionEntity } from "./package-version.entity";
import { PaymentGatewayEntity } from "./payment-gateway.entity";



@Entity()
export class OrderEntity extends BaseEntity {
  @Column({
    type: "bigint"
  })
  id_order: number

  @JoinColumn()
  @ManyToOne(() => PackageVersionEntity, (ver) => ver.order, { onDelete: "SET NULL" })
  packageVersion: PackageVersionEntity

  @Column({ type: "varchar" ,default : "other"})
  type: "online" | "wallet" | "other"

  @Column()
  id_payment : string

  @JoinColumn()
  @ManyToOne(() => PaymentGatewayEntity, (gateway) => gateway.order, { onDelete: "SET NULL" })
  payment_gatway: PaymentGatewayEntity
}