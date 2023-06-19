export type searchPgParams = {
    limit : number,
    page : number,
    searchQuery : string
}

export type CreateIpgParams = {
    name : string,
    slug : string,
    status : boolean
}

export type UpdateIpgParams = {
    id : string
    name : string,
    slug : string,
    status : boolean
}


export type CreatePaymentParams = {
    packageVersionId : string
}

export type RequsetPaymentParams = {
    merchant :string
    amount : number
    callbackUrl :string
    description? :string
    orderId? :string
    mobile? :string
    allowedCards? : string[]
    ledgerId? :string
    linkToPay? :boolean
    sms? : boolean
}

export type RequsetPaymentResultParams = {
    trackId: string,
    result: 100 | 102 | 103 | 104 | 105 | 106 | 113,
    message : string

}

export type PaymentCallbackParms= {
    success : 0 | 1
    trackId : any
    orderId : any
    status : any
    cardNumber : any
    hashedCardNumber : any
}

export type AcceptPaymentParams= {
    merchant : string,
    trackId : number
}

export type AcceptPaymentResultParams= {
    paidAt: string,
    amount: number,
    result: number,
    status: number,
    refNumber: number,
    description: string,
    cardNumber: string,
    orderId: string,
    message : string
}