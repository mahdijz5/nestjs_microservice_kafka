import { IsNotEmpty, IsString,IsEmail, Length, IsArray, IsNumber } from "class-validator"

export class PaymentCallbackDto {
    success : 0 | 1
    trackId : any
    orderId : any
    status : any
    cardNumber : any
    hashedCardNumber : any
}