import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateIpgDto  {
    @IsNotEmpty()
    @IsString()
    name : string

    @IsNotEmpty()
    @IsString()
    slug : string

    @IsBoolean()
    status : boolean
}