import { NextFunction, Request, Response, Router } from "express";
import { authController } from "./auth.controller";
import { checkAuthetication } from "../../middlewares/checkAuthentication";
import { Role } from "../user/user.interface";
import passport from "passport";

export const authRoutes = Router()

authRoutes.post("/login", authController.credentialsLogin)
authRoutes.post('/refresh-token', authController.getNewAccessToken)
authRoutes.post('/logout', authController.logoutUser)
authRoutes.patch('/reset-password', checkAuthetication(...Object.values(Role)), authController.resetPassword)


authRoutes.get("/google", async (req: Request, res: Response, next: NextFunction) => {
  const redirect = req.query.redirect || "/"
  passport.authenticate("google", { scope: ["profile", "email"], state:redirect as string })(req, res, next)
})


authRoutes.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), authController.googleCallback)

