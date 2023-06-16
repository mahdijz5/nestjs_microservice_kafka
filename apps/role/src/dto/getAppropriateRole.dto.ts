import { IsNotEmpty, IsString,IsEmail, Length, IsArray } from "class-validator"

export class GetAppropriateRoleDto {
    role : string[]
}