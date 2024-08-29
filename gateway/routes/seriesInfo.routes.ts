import { Router } from "express";
import {
  infoController,
  fieldController,
  getMangaListController,
} from "../controllers/seriesInfo.controllers";
const seriesRouter = Router();

// Refactor into individual router once more search functions are created

seriesRouter.get("/latest/updated", getMangaListController("latest"));
seriesRouter.get("/most/popular", getMangaListController("popular"));
seriesRouter.get("/newest", getMangaListController("newest"));

seriesRouter.get("/:mangaId/", infoController);
seriesRouter.get("/:mangaId/:fieldId", fieldController);

export { seriesRouter };
