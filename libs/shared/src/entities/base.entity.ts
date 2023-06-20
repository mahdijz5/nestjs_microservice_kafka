import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @CreateDateColumn( )
    createdAt: Date;
}