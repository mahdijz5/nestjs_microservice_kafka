import { IsNotEmpty, IsString,IsEmail, Length, IsArray } from "class-validator"

export class CreateSeasonDto {

    @IsNotEmpty()
    @IsString()
    @Length(0, 150)
    from : string

    @IsNotEmpty()
    @IsString()
    @Length(0, 150)
    to : string

    @IsNotEmpty()
    @IsString()
    @Length(0, 150)
    name : string

    @IsNotEmpty()
    @IsString()
    @Length(0, 150)
    type : "calculation" | "beginning"

}