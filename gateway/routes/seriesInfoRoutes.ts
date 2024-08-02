import { Router } from "express";
import {
  mangaInfoController,
  mangaSearchController,
} from "../controllers/mangaInfoControllers";
const seriesRouter = Router();

// Refactor into individual router once more search functions are created
seriesRouter.get("/search", mangaSearchController);

seriesRouter.get("/:mangaId/", mangaInfoController);

export { seriesRouter };
