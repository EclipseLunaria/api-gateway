import { Router, Request, Response } from "express";
import { chapterFetchController } from "../controllers/fetch.controllers";

const chapterFetchRouter = Router();

chapterFetchRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello Chapter Fetch Router!");
});

chapterFetchRouter.get(
  "/:mangaId/:chapterId",
  chapterFetchController
);

export default chapterFetchRouter;
