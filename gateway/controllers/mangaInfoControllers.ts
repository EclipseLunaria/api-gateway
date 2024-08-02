import { Request, Response } from "express";
import { normalizeQuery } from "../utils/searchUtils";
import {
  fetchChapterList,
  fetchMangaFields,
  fetchMangaInfo,
  searchMangaSeries,
} from "../services/searchMangaServices";

const searchController = async (req: Request, res: Response) => {
  const { q } = req.query;
  if (!q) {
    res.status(404).send({ message: "specify a search term" });
    return;
  }

  const normalizedSearchTerm = normalizeQuery(q.toString());
  const searchResults = await searchMangaSeries(normalizedSearchTerm);

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

export { searchController, infoController, chapterController, fieldController };
