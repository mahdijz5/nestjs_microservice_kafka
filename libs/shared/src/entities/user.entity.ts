import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity,  OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn({
        type: "bigint"
    })
    id: number

    @Column({
        type: "varchar",
        length: 150,
        unique: true
    })
    email: string

    @Column({
        type: "varchar",
        length: 150,
    })
    username: string

    @Column({
        type: "varchar",
    })
    password: string


}