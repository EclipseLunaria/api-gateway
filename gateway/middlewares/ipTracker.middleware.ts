import { Request, Response, NextFunction } from "express";

export const ipTrackerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    console.log("Request IP:", req.ip)
    next();
}

export default ipTrackerMiddleware