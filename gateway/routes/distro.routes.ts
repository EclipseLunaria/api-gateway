import { Router } from "express";
import { fetchChapterController } from "../controllers/distro.controllers";
const distroRouter = Router();

distroRouter.get("/:mangaId/:chapterId", fetchChapterController);

export default distroRouter;
