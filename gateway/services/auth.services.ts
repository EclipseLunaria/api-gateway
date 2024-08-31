import { verify } from "jsonwebtoken";
const checkAuth = (token: string) => {
  const decodedToken: any = verify(token, process.env.JWT_SECRET || "") as any;

  if (Date.now() > Number(decodedToken.token_expires_at)) {
    throw new Error("Token Expired");
  }
};

export { checkAuth };
