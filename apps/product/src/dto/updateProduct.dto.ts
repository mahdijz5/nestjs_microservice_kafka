import { IsNotEmpty, IsString,IsEmail, Length, IsArray, IsBoolean, IsNumber } from "class-validator"

export class UpdateProductDto {
    @IsNotEmpty()
    @IsNumber()
    id :number
    
    @IsString()
    @Length(1,150)
    title : string

    @IsArray()
    packageIdList?: number[] 
    
}