import { NextFunction, Response, Request } from "express";

export const ErrorHandlerMiddleware  = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("Error Handling Middleware called")
  console.log('Path: ', req.path)
  res.send("ERROR");
  // next()
}