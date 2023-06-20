import { seasonType } from "@app/shared/entities/season.entity"
import { IsNotEmpty, IsString,IsEmail, Length, IsArray, IsDate, IsEnum } from "class-validator"

export class CreateSeasonDto {
    @IsDate()
    from : Date

    @IsNotEmpty()
    @IsDate()
    to : Date

    @IsEnum(seasonType)
    type : "calculated" | "beginning"

}