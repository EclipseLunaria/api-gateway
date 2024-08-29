import { Router } from "express";
import findManga from "../controllers/search.controllers";
import { searchController } from "../controllers/seriesInfo.controllers";

const searchRouter = Router();
//generic search endpoint
// TODO: improve search algo to support more advanced searches
searchRouter.get("/", searchController);

searchRouter.get("/newest", findManga("newest"));
searchRouter.get("/latest", findManga("last_updated"));
searchRouter.get("/popular", findManga("popular"));

export default searchRouter;
