import { Router } from "express";
import checkAuthController from "../controllers/auth.controllers";

const authRouter = Router();

authRouter.get("/check", checkAuthController);

export default authRouter;
