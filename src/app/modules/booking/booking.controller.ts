import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BookingService } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";

const createBooking = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
     const decodedToken = req.user as JwtPayload
 console.log(decodedToken)
    const booking = await BookingService.createBooking(req.body, decodedToken.id)
    sendResponse(res, {
        statusCode:201,
        success:true,
        message:"Successfully created the booking",
        data:booking
    })
})

// const getUserBookings  = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
//     const decodedToken = req.user
// const bookings = await BookingService.getUserBooking()
//  sendResponse(res, {
//         statusCode:201,
//         success:true,
//         message:"Successfully fetched the booking",
//         data:bookings
//     })
// })


// const getSingleBooking  = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
// const bookings = await BookingService.getSingleBookingById()
//  sendResponse(res, {
//         statusCode:201,
//         success:true,
//         message:"Successfully fetched the booking",
//         data:bookings
//     })
// })

// const getAllBookings  = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
// const bookings = await BookingService.getAllBookings()
//  sendResponse(res, {
//         statusCode:201,
//         success:true,
//         message:"Successfully fetched the booking",
//         data:bookings
//     })
// })

// const updateBookingStatus  = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
// const bookings = await BookingService.updateBookingStatus()
//  sendResponse(res, {
//         statusCode:201,
//         success:true,
//         message:"Successfully updated booking status",
//         data:bookings
//     })
// })

export const BookingController = {
    createBooking
}