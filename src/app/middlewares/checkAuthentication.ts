import { AppError } from "../errors/AppError";
import { verifyToken } from "../utils/jwt";
import { NextFunction, Request, Response } from "express";
export const checkAuthetication = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError("No token received");
        }

        const verifiedToken = verifyToken(accessToken);

        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError("You are not authorized to access this route");
        }
        req.user = verifiedToken
        next();
    } catch (error) {
        next(error);
    }
}