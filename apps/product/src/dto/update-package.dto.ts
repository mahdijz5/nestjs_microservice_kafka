import { IsNotEmpty, IsString,IsEmail, Length, IsArray, IsBoolean, IsNumber } from "class-validator"

export class UpdatePackageDto {
    @IsNotEmpty()
    id :number

    @IsString()
    @Length(1,150)
    title : string

    @IsArray()
    packageIdList?: number[] 
    
    @IsNumber()
    price : number
}