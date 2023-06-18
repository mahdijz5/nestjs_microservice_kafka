import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column({
        type: 'timestamp',
        default: new Date().toISOString(),
    })
    createdAt: Date;
}