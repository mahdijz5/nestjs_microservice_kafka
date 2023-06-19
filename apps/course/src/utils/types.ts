export type CreateCourseParams = {
    from : string
    to : string
    name : string
    type : "calculation" | "beginning"
}

export type updateCourseParams = {
    id : string
    from ?: string
    to? : string
    name? : string
    rate? : number
    type? : "calculation" | "beginning"
}