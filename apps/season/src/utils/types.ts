export type CreateSeasonParams = {
    from : string
    to : string
    name : string
    type : "calculation" | "beginning"
}

export type updateSeasonParams = {
    id : string
    from ?: string
    to? : string
    name? : string
    rate? : number
    type? : "calculation" | "beginning"
}