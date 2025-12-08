import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/AppError";
import { IAuthProvider, Iuser, Role } from "./user.interface";
import { UserModel } from "./user.model";
import bcrypt, { hash } from "bcryptjs"
import { ITokenPayload } from "../../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { hashPassword } from "../../utils/bcryptJs";

const createUser = async (payload: Partial<Iuser>) => {
    const { email, password, role, ...rest } = payload
    const isUserExist = await UserModel.findOne({ email })
    if (isUserExist) {
        throw new AppError("User already exists", StatusCodes.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password as string, 10)
    const authProvider: IAuthProvider = { provider: "credentials", providerId: email as string }
    const user = await UserModel.create({
        email,
        auths: [authProvider],
        password: hashedPassword,
        role: role,
        ...rest
    })
    return user
}
const updateUser = async (userId: string, payload: Partial<Iuser>, decodedToken: JwtPayload) => {
   const isUserExist = await UserModel.findById(userId )
    if (!isUserExist) {
        throw new AppError("User does not exist", StatusCodes.NOT_FOUND);
    }
  
    if (decodedToken.role) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError("You are not authorized to udpate this accound", StatusCodes.UNAUTHORIZED)
        }
        if (payload.role &&
            (payload.role === Role.SUPER_ADMIN || payload.role === Role.ADMIN)) {
            throw new AppError("You cannot assign high-level roles", StatusCodes.UNAUTHORIZED);
        }

    }

    if ((payload.isActive || payload.isVerified) &&
        (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE)) {
        throw new AppError("Not allowed", StatusCodes.UNAUTHORIZED);
    }
    if(payload.password) {
        payload.password = await hashPassword(payload.password)
    }
    const newUpdatedUser = await UserModel.findByIdAndUpdate(userId, payload, {new:true, runValidators:true})
    return newUpdatedUser

}

const getAllUsers = async () => {
    const users = await UserModel.find({})
    const totalUsers = await UserModel.countDocuments()
    return {
        users, totalUsers
    }
}
export const userService = { createUser, getAllUsers, updateUser }