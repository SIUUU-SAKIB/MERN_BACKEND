import { ErrorRequestHandler } from 'express';
import { AppError } from '../errors/AppError';

export const globalError: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;

  if (!(err instanceof AppError)) {
    error = new AppError('INTERNAL SERVER ERROR 😔', 500);
  }

  const appError = error as AppError;

  if (process.env.NODE_ENV !== 'production') {
    console.error('ERROR 💥', err);
  }

  return res.status(appError.statusCode).json({
    status: appError.status,
    message: appError.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};
