import { Router } from "express";
import {
  seriesInfoController,
  fieldController,
} from "../controllers/seriesControllers";


export const seriesRouter = Router();

seriesRouter.get("/manga/:manga_id/", seriesInfoController);

seriesRouter.get("/manga/:manga_id/:field", fieldController);
