import { IsNotEmpty, IsString,IsEmail, Length } from "class-validator"

export class ResetPasswordDto {
    @IsString()
    token : string

    @IsNotEmpty()
    @IsString()
    @Length(5, 60)
    password : string

    @IsNotEmpty()
    @IsString()
    @Length(5, 60)
    confirmPassword : string   
}