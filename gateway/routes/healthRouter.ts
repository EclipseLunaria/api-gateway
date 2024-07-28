import { Router } from "express";
import { getMicroserviceHealth } from "../controllers/healthControllers";

const healthRouter = Router();

healthRouter.get("/microservices/", getMicroserviceHealth);

export { healthRouter };
