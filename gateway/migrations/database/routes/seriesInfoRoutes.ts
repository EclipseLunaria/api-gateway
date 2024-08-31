import { Router } from "express";
import {
  fetchFieldController,
  fetchSeriesController,
  uploadSeriesController,
} from "../controllers/MangaInfoController";

const seriesInfoRouter = Router();

seriesInfoRouter.post("/upload", uploadSeriesController);
seriesInfoRouter.get("/:mangaId", fetchSeriesController);
seriesInfoRouter.get("/:mangaId/:field", fetchFieldController);

export default seriesInfoRouter;
