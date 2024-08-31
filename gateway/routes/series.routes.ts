import { Router } from "express";
import {
  infoController,
  fieldController,
} from "../controllers/series.controllers";

const seriesRouter = Router();

seriesRouter.get("/:mangaId/", infoController);

seriesRouter.get("/:mangaId/:fieldId", fieldController);

export { seriesRouter };
