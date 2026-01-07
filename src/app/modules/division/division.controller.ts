import {
    NextFunction, Request, Response
} from "express";
import { DivisionModel } from "./division.model";
import { DivisionService } from "./division.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createDivision = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    try {
        const result = await DivisionService.createDivision(req.body)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Divisions created successfully 😍",
            data: result
        });

    } catch (error) {
        next(error)
    }
}
const getAllDivision = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await DivisionService.getAllDivision()
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "Divisions retrived successfully 😍",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const DivisionController = {
    createDivision,
   getAllDivision
}