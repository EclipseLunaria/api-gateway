import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import IAuthenticatedRequest from "../interfaces/auth.interfaces/AuthenticatedRequest.interface";
const userRouter = Router();
userRouter.use(authMiddleware);
userRouter.get("/", (req, res) => {
  const user = (req as IAuthenticatedRequest).user;
  console.log(user);
  res.send(`Hello User ${user.name}!`);
});

export default userRouter;
