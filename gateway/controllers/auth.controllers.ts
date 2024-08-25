import { Request, Response } from "express";
import { checkAuth } from "../services/auth.services";

const checkAuthController = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization?.split(" ")[1];
  if (!authHeader) {
    res.status(403).send({ message: "No Token Provided" });
  }
  checkAuth(authHeader || "");

  res.send(202).send("ok");
};

export default checkAuthController;
