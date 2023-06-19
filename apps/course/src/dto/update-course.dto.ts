import {  IsString,IsEmail, Length, IsArray, IsNotEmpty, IsNumber } from "class-validator"

export class UpdateCourseDto {

    @IsString()
    @Length(0, 150)
    from : string

    @IsString()
    @Length(0, 150)
    to : string

    @IsString()
    @Length(0, 150)
    name : string
    
    @IsNumber()
    rate : number

    @IsString()
    @Length(0, 150)
    type : "calculation" | "beginning"

    @IsString()
    @IsNotEmpty()
    id : string

}