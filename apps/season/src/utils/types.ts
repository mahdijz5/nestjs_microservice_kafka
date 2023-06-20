export type CreateSeasonParams = {
    from : Date
    to : Date
    type : "calculated" | "beginning"
}

export type updateSeasonParams = {
    id : string
    from ?: Date
    to? : Date
    type? : "calculated" | "beginning"
}