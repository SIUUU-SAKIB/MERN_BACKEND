import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/AppError";
import { IsActive, Iuser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import bcrypt from "bcryptjs"
import jwt, { JwtPayload } from "jsonwebtoken"
import { generateToken, ITokenPayload, verifyRefreshToken } from "../../utils/jwt";
import { envVariables } from "../../constants/env";

const credentialsLogin = async (payload: Partial<Iuser>) => {
    const { email, password } = payload
    const isUserExist = await UserModel.findOne({ email })
    if (!isUserExist)
        throw new AppError("User does not exist", StatusCodes.BAD_REQUEST)

    const isPasswordMathced = await bcrypt.compare(password as string, isUserExist.password as string)
    if (!isPasswordMathced)
        throw new AppError("Wrong password", StatusCodes.UNAUTHORIZED);

    const jwtPayload: ITokenPayload = {
        id: isUserExist._id.toString(),
        email: isUserExist.email,
        role: isUserExist.role || "USER"
    }

    const accessToken = generateToken(jwtPayload, envVariables.JWT_SECRET_TOKEN, envVariables.JWT_SECRET_EXPIRE)
    const refreshToken = generateToken(jwtPayload, envVariables.JWT_REFRESH_TOKEN, envVariables.JWT_REFRESH_EXPIRE)
    const { password: pass, ...rest } = isUserExist.toObject()
    return {
        email: isUserExist.email,
        role: isUserExist.role,
        accessToken,
        refreshToken,
        user: rest
    }
}



const getNewAccessToken = async (refreshToken: string) => {
    const verifyToken = verifyRefreshToken(refreshToken)


    const isUserExist = await UserModel.findOne({ email: verifyToken.email })
    if (!isUserExist) {
        throw new AppError("User does not exist", StatusCodes.BAD_REQUEST)
    }

    if (
        isUserExist.isActive === IsActive.BLOCKED ||
        isUserExist.isActive === IsActive.INACTIVE
    ) {
        throw new AppError(`OOPS user is ${isUserExist.isActive}`, StatusCodes.BAD_REQUEST);
    }
    const jwtPayload: ITokenPayload = {
        id: isUserExist._id.toString(),
        email: isUserExist.email,
        role: isUserExist.role || "USER"
    }

    const accessToken = generateToken(jwtPayload, envVariables.JWT_SECRET_TOKEN, envVariables.JWT_SECRET_EXPIRE)

    return {
        accessToken,
    }
}

const resetPassword = async (
    oldPassword: string,
    newPassword: string,
    decodedToken: JwtPayload
) => {

    const user = await UserModel.findOne({ email: decodedToken.email })
    if (!user) {
        throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }
    const isPasswordMatched = await bcrypt.compare(
        oldPassword,
        user.password as string
    );
    if (!isPasswordMatched) {
        throw new AppError("Old password is incorrect ❌", StatusCodes.BAD_REQUEST);
    }
    user.password = await bcrypt.hash(
        newPassword,
        Number(envVariables.BCRYPT_SALT_ROUND)
    );
    await user.save();
    return true;
};
export const authService = { credentialsLogin, getNewAccessToken, resetPassword }