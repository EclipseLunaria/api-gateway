import { Router } from "express";
import { chapterFetchController } from "../controllers/chapterFetchController";

const chapterFetchRouter = Router();

chapterFetchRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

chapterFetchRouter.get("/manga-:mangaId/chapter-:id", chapterFetchController);

export default chapterFetchRouter;
