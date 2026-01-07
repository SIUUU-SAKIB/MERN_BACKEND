import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { authService } from "./auth.service";
import { AppError } from "../../errors/AppError";
import { setAuthCookies } from "../../utils/setCookies";
import { createUserTokens } from "../../utils/userTokens";
import { envVariables } from "../../constants/env";

const credentialsLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await authService.credentialsLogin(req.body)
        setAuthCookies(res, user)
        sendResponse(res, {
            message: "Login successful",
            statusCode: StatusCodes.ACCEPTED,
            data: user,
            success: true
        })
    } catch (error) {
        next(error)
    }
}
const getNewAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        throw new AppError("No refreshToekn received from cookies", StatusCodes.BAD_REQUEST)
    }
    const tokenInfo = await authService.getNewAccessToken(refreshToken)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User Logged in successfull",
        data: tokenInfo
    })
    setAuthCookies(res, tokenInfo)
}

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: 'none'
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "none"
        })

        sendResponse(res, {
            success: true,
            message: "Logout successfull ✅",
            data: null,
            statusCode: StatusCodes.OK
        })
    } catch (error) {
        next(error)
    }
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decodedToken = req.user
        if (!decodedToken) {
            throw new AppError('Unauthorized', StatusCodes.UNAUTHORIZED)
        }
        const { oldPassword, newPassword } = req.body
        await authService.resetPassword(oldPassword, newPassword, decodedToken)
        sendResponse(res, {
            success: true,
            message: "Reset password successfull ✅",
            data: null,
            statusCode: StatusCodes.OK
        })
    } catch (error) {
        next(error)
    }
}
const googleCallback = async (req: Request, res: Response, next: NextFunction) => {

    let redirectTo = req.query.state ? req.query.state as string : ""

    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1)
    }

    // /booking => booking , => "/" => ""
    const user = req.user;

    if (!user) {
        throw new AppError( "User Not Found", StatusCodes.NOT_FOUND)
    }

    const tokenInfo = createUserTokens(user)

    setAuthCookies(res, tokenInfo)
    res.redirect(`${envVariables.FRONTEND_PORT}/${redirectTo}`)
}

export const authController = { credentialsLogin, getNewAccessToken, logoutUser, resetPassword, googleCallback }

