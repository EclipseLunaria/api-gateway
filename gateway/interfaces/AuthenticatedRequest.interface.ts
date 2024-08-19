import { Request } from "express";

interface IAuthenticatedRequest extends Request {
  user: IClientJWT;
}

export default IAuthenticatedRequest;
