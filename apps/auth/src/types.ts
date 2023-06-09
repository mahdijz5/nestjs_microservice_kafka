 export type CreateUserParams = {
    email : string
    username : string
    password : string
    role?: string[]
    confirmPassword : string
}

export type ForgotPasswordParams = {
    email : string
}
export type ResetPasswordParams = {
    password : string
    confirmPassword : string
    token : string
}