import { NextFunction, Response, Request } from "express";

export const ErrorHandlerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("Error Handling Middleware called")
  console.log('err: ', error)
  res.send("INTERNAL SERVER ERROR");
  // next()
}