import { envVariables } from "../constants/env"
import { Iuser } from "../modules/user/user.interface"
import { generateToken, ITokenPayload} from "./jwt"

export const createUserTokens = (user: Partial<Iuser>) => {
    const jwtPayload: ITokenPayload= {
        id: user._id as string,
        email: user.email as string,
        role: user.role || "USER"
    }
    const accessToken = generateToken(jwtPayload, envVariables.JWT_SECRET_TOKEN, envVariables.JWT_SECRET_EXPIRE)

    const refreshToken = generateToken(jwtPayload, envVariables.JWT_REFRESH_TOKEN, envVariables.JWT_REFRESH_EXPIRE)


    return {
        accessToken,
        refreshToken
    }
}
