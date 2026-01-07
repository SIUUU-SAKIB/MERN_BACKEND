import { Types } from "mongoose";
export enum PAYMENT_STATUS {
    PAID = "PAID", UNPAID = "UNPAID", CANCELLED = "CANCELLED", FAILED = "FAILED", REFUND = "REFUND"

}
export interface IPayment {
    booking: Types.ObjectId,
    transactionId: string;
    status:PAYMENT_STATUS;
    amount: number,
    paymentGatewayData?: any,
    invoiceURL?: string
}