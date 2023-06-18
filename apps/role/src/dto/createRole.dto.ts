 import { IsNotEmpty, IsString,IsEmail, Length, IsArray } from "class-validator"

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    @Length(1,150)
    name : string
}