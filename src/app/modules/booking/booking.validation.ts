import z from "zod";
import { BOOKING_STATUS } from "./booking.interface";


export const createBookingZodSchema = z.object({
  user: z.string().optional(),

  tour: z.string(),

  payment: z.string()
    .optional(),

  status: z
    .enum([
      BOOKING_STATUS.PENDING,
      BOOKING_STATUS.COMPLETE,
      BOOKING_STATUS.FAILED,
      BOOKING_STATUS.CANCEL
    ])
    .optional(),

  guestCount: z
    .number()
    .int("Guest count must be an integer")
    .positive("Guest count must be at least 1"),
});
export const updateBookingStatusZodSchema = z.object({
  status:z.enum(Object.values(BOOKING_STATUS))
})