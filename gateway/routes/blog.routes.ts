import { Router } from "express";
import {
  articleListController,
  getArticleContentController,
  getUserController,
} from "../controllers/blog.controllers";

const blogRouter = Router();

blogRouter.get("/me", getUserController);
blogRouter.get("/articles", articleListController);
blogRouter.get("/articles/:articleId", getArticleContentController);
export default blogRouter;
