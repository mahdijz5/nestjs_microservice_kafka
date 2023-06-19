import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreatePaymentDto {
    
    @IsString()
    @IsNotEmpty()
    packageVersionId : string
    
    @IsEmail()
    @IsNotEmpty()
    email : string
}