import { Router } from "express";
import findManga from "../controllers/search.controllers";
import { searchController } from "../controllers/series.controllers";

const searchRouter = Router();
//generic search endpoint
// TODO: improve search algo to support more advanced searches
searchRouter.get("/", searchController);

searchRouter.get("/newest", findManga("newest"));
searchRouter.get("/latest", findManga("latest"));
searchRouter.get("/popular", findManga("popular"));


export default searchRouter;
