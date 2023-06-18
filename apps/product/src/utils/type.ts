export type CreateProductParams = {
    title : string
}

export type UpdateProductParams = {
    id :string
    title ?: string
}

export type CreatePackageParams = {
    title : string
    productIdList?: string[] 
    price :number
}

export type UpdatePackageParams = {
    id: string
    title?: string
    productIdList?: string[] 
    price?:number
}

export type CreateProductGroupParams = {
    title: string
    packageIdList?: string[] 
}

export type UpdateProductGroupParams = {
    id: string
    title?: string
    packageIdList?: string[] 
    status ?: boolean
}