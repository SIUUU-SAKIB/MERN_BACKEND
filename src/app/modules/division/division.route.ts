import { Router } from "express";
import { DivisionController } from "./division.controller";
import { validateZodSchema } from "../../middlewares/validate";
import { divisionSchema, updateDivisionSchema } from "./division.validation";
import { checkAuthetication } from "../../middlewares/checkAuthentication";
import { Role } from "../user/user.interface";

export const DivisionRoutes = Router()


DivisionRoutes.post("/create-division",
    checkAuthetication("ADMIN", "SUPER_ADMIN"),
    validateZodSchema(divisionSchema),
    DivisionController.createDivision,
)

// DivisionRoutes.patch(":/id",
//      checkAuthetication(Role.ADMIN, Role.SUPER_ADMIN),
//      validateZodSchema(updateDivisionSchema),
//      DivisionController.updateDivision
// )

DivisionRoutes.get('/get-all-division',
    checkAuthetication("ADMIN", "SUPER_ADMIN"),
    DivisionController.getAllDivision
)
