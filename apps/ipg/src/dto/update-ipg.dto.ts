import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateIpgDto  {
    @IsNumber()
    @IsNotEmpty()
    id :number

    @IsString()
    name : string

    @IsString()
    slug : string

    @IsBoolean()
    status : boolean
}