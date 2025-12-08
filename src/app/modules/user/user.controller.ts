import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/AppError";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.createUser(req.body)
        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            message: 'User created successfully 🎉',
            data: result,
            success: true

        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}
const updateUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const id = req.params.id
        const payload = req.body
        if (!req.user) {
            throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED);
        }
        const verifiedToken = req.user
        const result = await userService.updateUser(id, payload, verifiedToken)
        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            message: 'User updated successfully 🎉',
            data: result,
            success: true
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}
const getAllUSers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.getAllUsers()
        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.CREATED,
            message: "All users retrived successfully",
            data: result,
            total: result.totalUsers,

        })
    } catch (error) {
        next(error)
    }
}
export const userController = { createUser, getAllUSers, updateUser }