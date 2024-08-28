import { verify } from "jsonwebtoken";
import { IBearerBody } from "../interfaces/auth.interfaces";
import IAcessToken from "../interfaces/auth.interfaces/IAccessToken";
const checkAuth = (token: string) => {
  const decodedToken: IAcessToken = verify(
    token,
    process.env.JWT_SECRET || ""
  ) as IAcessToken;

  if (Date.now() > Number(decodedToken.token_expires_at)) {
    throw new Error("Token Expired");
  }
};

export { checkAuth };
