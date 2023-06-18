import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateIpgDto  {
    @IsString()
    @IsNotEmpty()
    id :string

    @IsString()
    name : string

    @IsString()
    slug : string

    @IsBoolean()
    status : boolean
}