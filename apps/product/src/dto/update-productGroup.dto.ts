import { IsNotEmpty, IsString,IsEmail, Length, IsArray, IsBoolean, IsNumber, IsEmpty } from "class-validator"

export class UpdateProductGroupDto {
    @IsNotEmpty()
    @IsNotEmpty()
    id :number

    @IsString()
    @Length(1,150)
    title : string

    @IsArray()
    packageIdList?: number[] 
    
    @IsBoolean()
    status : boolean

}