import { IsNotEmpty, IsString,IsEmail, Length, IsArray, IsNumber } from "class-validator"

export class UpdateRoleDto {
    @IsString()
    name : string

    @IsNumber()
    @IsNotEmpty()
    id :number
}