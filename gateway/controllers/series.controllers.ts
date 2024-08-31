import { Request, Response } from "express";
import { normalizeQuery } from "../utils/search.utils";
import {
  fetchChapterList,
  fetchMangaFields,
  fetchMangaInfo,
  getSeriesList,
  searchMangaSeries,
} from "../services/seriesInfo.services";
import { SearchCategory } from "../types";

const searchController = async (req: Request, res: Response) => {
  const q = normalizeQuery(req.query.q?.toString() ?? "");
  if (!q) {
    res.status(404).send({ message: "specify a search term" });
    return;
  }

  const searchResults = await searchMangaSeries(q);
  if (!searchResults) return res.status(404).send("Error");
  return res.json(searchResults);
};

const getMangaListController =
  (type: SearchCategory) => async (req: Request, res: Response) => {
    const searchResults = await getSeriesList(type);
    if (!searchResults) return res.status(404).send("Error");
    return res.json(searchResults);
  };

const infoController = async (req: Request, res: Response) => {
  console.log(req.params);
  const { mangaId } = req.params;
  if (!mangaId) {
    res.status(404).send({ message: "specify a manga id" });
    return;
  }
  console.log("mangaId:", mangaId);
  const mangaInfo = await fetchMangaInfo(mangaId);
  console.log(mangaInfo);
  if (!mangaInfo) return res.status(404).send("Error: Manga not found");
  return res.json(mangaInfo);
};

const chapterController = async (req: Request, res: Response) => {
  const { mangaId } = req.params;
  if (!mangaId) {
    res.status(404).send({ message: "specify a manga id." });
    return;
  }
  const chapterList = await fetchChapterList(mangaId);
  if (!chapterList) return res.status(404).send("Error: Chapter not found.");
  return res.json(chapterList);
};

const fieldController = async (req: Request, res: Response) => {
  const { mangaId, fieldId } = req.params;
  if (!mangaId || !fieldId) {
    res.status(404).send({ message: "specify a manga id and field." });
    return;
  }
  const fieldInfo = await fetchMangaFields(mangaId, fieldId);
  if (!fieldInfo) return res.status(404).send("Error: Field not found.");
  return res.json(fieldInfo);
};

export {
  searchController,
  getMangaListController,
  infoController,
  chapterController,
  fieldController,
};
