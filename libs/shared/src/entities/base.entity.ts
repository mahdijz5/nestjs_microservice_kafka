import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: 'timestamp',
        default: new Date().toISOString(),
    })
    createdAt: Date;
}