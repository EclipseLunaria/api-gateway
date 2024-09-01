import { Router, Response, Request, NextFunction } from "express";
import {
  infoController,
  fieldController,
  chapterController,
  randomSeriesController,
} from "../controllers/series.controllers";
const seriesRouter = Router();

seriesRouter.param(
  "mangaId",
  (req: Request, res: Response, next: NextFunction, mangaId) => {
    (req as any).mangaId = mangaId;
    next();
  }
);

seriesRouter.get("/random", randomSeriesController);

seriesRouter.get("/:mangaId/", infoController);
seriesRouter.get("/:mangaId/chapters", chapterController);
seriesRouter.get("/:mangaId/:fieldId", fieldController);

export { seriesRouter };
