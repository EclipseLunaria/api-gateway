import { Router } from "express";
import {
  mangaInfoController,
  mangaSearchController,
} from "../controllers/mangaInfoControllers";
const seriesRouter = Router();

// Refactor into individual router once more search functions are created
seriesRouter.get("/search/manga", mangaSearchController);

seriesRouter.get("/search/manga/:id/", mangaInfoController);

export { seriesRouter };
