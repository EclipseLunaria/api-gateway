import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import IAuthenticatedRequest from "./AuthenticatedRequest.interface";
import IClientJWT from "./ClientJWT.interface";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .send({ message: "Unauthorized: No token provided." });
  }
  try {
    console.log(token, process.env.ACCESS_TOKEN_SECRET!);
    const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    console.log(decoded);
    (req as IAuthenticatedRequest).user = decoded as IClientJWT;
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized: Invalid token." });
  }
  next();
};

export default authMiddleware;
