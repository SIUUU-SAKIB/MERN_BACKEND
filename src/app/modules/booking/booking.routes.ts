import { Router } from "express";
import { checkAuthetication } from "../../middlewares/checkAuthentication";
import { Role } from "../user/user.interface";
import { validateZodSchema } from "../../middlewares/validate";
import { object } from "zod";
import { BookingController } from "./booking.controller";
import { createBookingZodSchema } from "./booking.validation";

export const bookingRoutes = Router()

bookingRoutes.post('/', checkAuthetication(...Object.values(Role)), validateZodSchema(createBookingZodSchema), BookingController.createBooking)

// bookingRoutes.get('/', checkAuthetication(Role.ADMIN, Role.SUPER_ADMIN), BookingController.getAllBookings)

// bookingRoutes.get('/my-bookings', checkAuthetication(...Object.values(Role)), BookingController.getUserBookings)

// bookingRoutes.get('/:bookingId', checkAuthetication(...Object.values(Role)), BookingController.getSingleBooking)

// bookingRoutes.patch('/:bookingId/status', checkAuthetication(...Object.values(Role)), validateZodSchema(updateBookingStatusZodSchema), BookingController.updateBookingStatus)