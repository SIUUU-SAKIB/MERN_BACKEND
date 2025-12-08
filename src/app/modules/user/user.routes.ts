import { Router } from "express";
import { userController } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateZodSchema } from "../../middlewares/validate";
import { Role } from "./user.interface";
import { checkAuthetication } from "../../middlewares/checkAuthentication";
export const userRoutes = Router()

userRoutes.post('/register',
    validateZodSchema(createUserZodSchema),
    userController.createUser)
userRoutes.patch("/:id", checkAuthetication(...Object.values(Role)), userController.updateUser)
userRoutes.get(
    "/all-users", checkAuthetication("ADMIN", "SUPER_ADMIN"),
    userController.getAllUSers
);
