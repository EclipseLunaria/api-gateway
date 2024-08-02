import { Router } from "express";
import {
  infoController,
  searchController,
  fieldController,
} from "../controllers/mangaInfoControllers";
const seriesRouter = Router();

// Refactor into individual router once more search functions are created
seriesRouter.get("/search", searchController);

seriesRouter.get("/:mangaId/", infoController);

seriesRouter.get("/:mangaId/:fieldId", fieldController);

export { seriesRouter };
