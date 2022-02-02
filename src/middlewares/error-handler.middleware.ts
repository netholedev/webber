import { ValidationError } from "class-validator";
import { NextFunction, Response, Request } from "express";
import { STATUS_CODES } from "http";

const isValidationError = (err: Error) => {
  if (Array.isArray(err)) {
    return err[0] instanceof ValidationError
  }

  return err instanceof ValidationError
}

export const ErrorHandlerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (isValidationError(error)) {
    return res.status(400).json(error);
  }

  return res.send("INTERNAL SERVER ERROR");
  // next()
}