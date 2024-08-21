import { Request } from "express";
import IClientJWT from "./ClientJWT.interface";

interface IAuthenticatedRequest extends Request {
  user: IClientJWT;
}

export default IAuthenticatedRequest;
