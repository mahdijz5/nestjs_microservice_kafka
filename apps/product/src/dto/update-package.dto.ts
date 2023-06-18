import { IsNotEmpty, IsString,IsEmail, Length, IsArray, IsBoolean, IsNumber } from "class-validator"

export class UpdatePackageDto {
    @IsNotEmpty()
    id :string

    @IsString()
    @Length(1,150)
    title : string

    @IsArray()
    packageIdList?: string[] 
    
    @IsNumber()
    price : number
}