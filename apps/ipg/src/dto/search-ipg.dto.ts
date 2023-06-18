import { IsNotEmpty, IsString,IsEmail, Length, IsArray, IsNumber } from "class-validator"

export class SearchIpgDto {
    @IsNumber()
    page : number
    
    @IsNumber()
    limit : number

    @IsString()
    searchQuery : string
}