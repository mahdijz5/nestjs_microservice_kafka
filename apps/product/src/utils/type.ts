export type CreateProductParams = {
    title : string
}

export type UpdateProductParams = {
    id :number
    title ?: string
}

export type CreatePackageParams = {
    title : string
    productIdList?: number[] 
    price :number
}

export type UpdatePackageParams = {
    id: number
    title?: string
    productIdList?: number[] 
    price?:number
}

export type CreateProductGroupParams = {
    title: string
    packageIdList?: number[] 
}

export type UpdateProductGroupParams = {
    id: number
    title?: string
    packageIdList?: number[] 
    status ?: boolean
}