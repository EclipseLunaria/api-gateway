import axios from "axios";
import { Response, Request } from "express";
import {
  getArticleContent,
  getArticleList,
  getUserInfo,
} from "../services/blog.services";

const getUserController = async (req: Request, res: Response) => {
  res.send(await getUserInfo());
};

const articleListController = async (req: Request, res: Response) => {
  res.send(await getArticleList());
};

const getArticleContentController = async (req: Request, res: Response) => {
  const { articleId } = req.params;
  res.send(await getArticleContent(Number(articleId)));
};

export {
  getUserController,
  articleListController,
  getArticleContentController,
};
