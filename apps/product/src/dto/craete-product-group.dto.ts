import { IsNotEmpty, IsString,IsEmail, Length, IsArray, IsBoolean } from "class-validator"

export class CreateProductGroupDto {
    @IsString()
    @IsNotEmpty()
    @Length(1,150)
    title : string

    @IsArray()
    packageIdList?: number[] 
    
    @IsBoolean()
    status : boolean
}