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
    id : number
    name : string,
    slug : string,
    status : boolean
}
