import { UserEntity } from "@app/shared"
import { IsNotEmpty, IsString,IsEmail, Length, IsArray } from "class-validator"

export class GetAppropriateRoleDto {
    user : UserEntity
    role : string[]
}