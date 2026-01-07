import { Router } from "express"
import { TourController } from "./tour.controller"
import { Role } from "../user/user.interface"
import { checkAuthetication } from "../../middlewares/checkAuthentication"
import { validateZodSchema } from "../../middlewares/validate"
import { createTourTypeZodSchema, createTourZodSchema } from "./tour.validation"

export const TourRoutes = Router()

TourRoutes.get('/tour-types',
    TourController.getAllTourTypes)

TourRoutes.post('/create',
    checkAuthetication(Role.ADMIN, Role.SUPER_ADMIN),
    validateZodSchema(createTourZodSchema), TourController.createTour)

TourRoutes.post('/create-tour-type',
    checkAuthetication(Role.ADMIN, Role.SUPER_ADMIN),
    validateZodSchema(createTourTypeZodSchema), TourController.createTourType)

TourRoutes.get('/',
    checkAuthetication(Role.ADMIN, Role.SUPER_ADMIN),
    TourController.getAllTours)

TourRoutes.patch('/:id',
    checkAuthetication(Role.ADMIN, Role.SUPER_ADMIN),

    TourController.updateTour)
TourRoutes.delete('/:id',
    checkAuthetication(Role.ADMIN, Role.SUPER_ADMIN),
    TourController.deleteTour
)
