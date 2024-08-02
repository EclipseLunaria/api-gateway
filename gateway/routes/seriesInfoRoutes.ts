import { Router } from "express";
import {
  infoController,
  searchController,
  chapterController,
} from "../controllers/mangaInfoControllers";
const seriesRouter = Router();

// Refactor into individual router once more search functions are created
seriesRouter.get("/search", searchController);

seriesRouter.get("/:mangaId/", infoController);

seriesRouter.get("/:mangaId/chapters", chapterController);

export { seriesRouter };
