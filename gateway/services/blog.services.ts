import { DevToArticle } from "../types";
import { blogAPI } from "../utils/blog.utils";

const getUserInfo = async () => {
  const results = await blogAPI.get("/users/me");
  console.log(results.data);
  const data = results.data;
  return data;
};

const getArticleList = async () => {
  const results = await blogAPI.get("/articles/me/all");
  const data = results.data as DevToArticle[];
  return data;
};

const getArticleContent = async (articleId: number) => {
  const results = await blogAPI.get(`/articles/${articleId}`);
  return results.data;
};

export { getUserInfo, getArticleList, getArticleContent };
