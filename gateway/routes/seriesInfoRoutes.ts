import { Router } from "express";
import {
  infoController,
  searchController,
  fieldController,
  getMangaListController,
} from "../controllers/mangaInfoControllers";
const seriesRouter = Router();

// Refactor into individual router once more search functions are created
seriesRouter.get("/search", searchController);

seriesRouter.get("/latest/updated", getMangaListController("last_updated"));
seriesRouter.get("/most/popular", getMangaListController("popular"));
seriesRouter.get("/newest", getMangaListController("newest"));

seriesRouter.get("/:mangaId/", infoController);

seriesRouter.get("/:mangaId/:fieldId", fieldController);

export { seriesRouter };
