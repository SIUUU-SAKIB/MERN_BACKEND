import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import { PaymentModel } from "../payment/payment.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { TourModel } from "../tour/tour.model";

const getTransactionId = () => {
    return `tran_${Date.now()}_${Math.floor(Math.random() * 100000)}`
}

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
    const transactionId = getTransactionId()


    const user = await UserModel.findById(userId)
    if (!user?.phone || !user?.address) {
        throw new AppError("Please update your profile to book a tour", StatusCodes.BAD_REQUEST)
    }
    const tour = await TourModel.findById(payload.tour).select("costFrom")
    if (!tour) {
        throw new AppError("No tour cost found", StatusCodes.BAD_REQUEST)
    }
    const amount = Number(tour.costFrom) * Number(payload.guestCount)

    const booking = await BookingModel.create({
        user: userId,
        status: BOOKING_STATUS.PENDING,
        ...payload
    })

    const payment = await PaymentModel.create({
        booking: booking._id,
        status: PAYMENT_STATUS.UNPAID,
        transactionId: transactionId,
        amount: amount
    })

    const updatedBooking = await BookingModel.findByIdAndUpdate(booking._id, { payment: payment._id }, { new: true, runValidators: true })
        .populate('user', 'name email address phone')
        .populate('payment')
        .populate('tour', "title costFrom")

    return updatedBooking
}

export const BookingService = {
    createBooking
}