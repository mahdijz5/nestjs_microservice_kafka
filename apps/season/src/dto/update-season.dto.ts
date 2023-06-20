import { seasonType } from "@app/shared/entities/season.entity"
import {  IsString,IsEmail, Length, IsArray, IsNotEmpty, IsNumber, IsDate, IsEnum } from "class-validator"

export class UpdateSeasonDto {

    @IsDate()
    from : Date

    @IsDate()
    to : Date
    
    @IsEnum(seasonType)
    type : "calculated" | "beginning"

    @IsString()
    @IsNotEmpty()
    id : string

}