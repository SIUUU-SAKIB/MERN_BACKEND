import { Response } from "express";

export interface TResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  total?: number;
}

export const sendResponse = <T>(res: Response, payload: TResponse<T>) => {
  return res.status(payload.statusCode).json({
    success: payload.success,
    statusCode: payload.statusCode,
    message: payload.message,
    total: payload.total,
    data: payload.data,
  });
};
