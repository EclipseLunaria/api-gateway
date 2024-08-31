import { Router } from "express";
import {
  infoController,
  fieldController,
  chapterController,
} from "../controllers/series.controllers";

const seriesRouter = Router();

seriesRouter.get("/:mangaId/", infoController);

seriesRouter.get("/:mangaId/chapters", chapterController);
seriesRouter.get("/:mangaId/:fieldId", fieldController);

export { seriesRouter };
