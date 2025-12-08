import { Router } from "express";
import { authController } from "./auth.controller";
import { checkAuthetication } from "../../middlewares/checkAuthentication";
import { Role } from "../user/user.interface";

export const authRoutes = Router()

authRoutes.post("/login", authController.credentialsLogin)
authRoutes.post('/refresh-token', authController.getNewAccessToken)
authRoutes.post('/logout', authController.logoutUser)
authRoutes.patch('/reset-password', checkAuthetication(...Object.values(Role)), authController.resetPassword)