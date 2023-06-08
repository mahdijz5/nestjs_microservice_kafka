import { IsNotEmpty, IsString,IsEmail, Length } from "class-validator"

export class ForgotPasswordDto {

    @IsNotEmpty()
    @IsEmail()
    email : string

}