import { IsNotEmpty, IsString,IsEmail, Length, IsArray, IsNumber } from "class-validator"


export class CreatePackageDto {
    @IsString()
    @IsNotEmpty()
    @Length(1,150)
    title : string

    @IsNumber()
    @IsNotEmpty()
    price : number

    @IsArray()
    productIdList :number[]
}