import { JwtPayload, SignOptions } from "jsonwebtoken";
import  jwt  from "jsonwebtoken";
import { envVariables } from "../constants/env";
import { Role } from "../modules/user/user.interface";

export interface ITokenPayload {
    id:string,
    email:string,
    role: Role | "USER"
}

export const generateToken = (payload:ITokenPayload,tokenPayload:string,  expiresIn:string) => {
    const token = jwt.sign(payload, tokenPayload, {
        expiresIn
    } as SignOptions)
    return token
}

export const verifyToken = (token:string):ITokenPayload => {
    const verifiedToken  = jwt.verify(token, envVariables.JWT_SECRET_TOKEN) as ITokenPayload
    return verifiedToken
}

export const verifyRefreshToken = (token:string):ITokenPayload => {
    const verifiedToken  = jwt.verify(token, envVariables.JWT_REFRESH_TOKEN) as ITokenPayload
    return verifiedToken
}