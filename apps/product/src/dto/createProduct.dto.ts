import { IsNotEmpty, IsString,IsEmail, Length, IsArray } from "class-validator"

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @Length(1,150)
    title : string
}