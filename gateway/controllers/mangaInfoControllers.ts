import { Request, Response } from "express";
import { normalizeQuery } from "../utils/searchUtils";
import {
  fetchMangaInfo,
  searchMangaSeries,
} from "../services/searchMangaServices";

const mangaSearchController = async (req: Request, res: Response) => {
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

const mangaInfoController = async (req: Request, res: Response) => {
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

export { mangaSearchController, mangaInfoController };
