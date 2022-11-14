export interface IUser {
    _id?: string,
    email: string,
    name: string,
    password: string,
    roles: string[],
    isActivated: boolean,
    activationLink: string,
}

export interface IResponse {
    user: IUser,
    accessToken: string,
    refreshToken: string,
}

export interface IActivate {
    Message: string
}