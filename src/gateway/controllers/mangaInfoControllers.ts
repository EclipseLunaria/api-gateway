import { Request, Response } from "express";
import { normalizeSearchTerm } from "../utils/searchUtils";
import {
  fetchMangaInfo,
  searchMangaSeries,
} from "../services/searchMangaServices";

const mangaSearchController = async (req: Request, res: Response) => {
  const { term } = req.query;
  if (!term) {
    res.status(404).send({ message: "specify a search term" });
    return;
  }
  const normalizedSearchTerm = normalizeSearchTerm(term.toString());
  const searchResults = await searchMangaSeries(normalizedSearchTerm);
  console.log(searchResults);
  if (!searchResults) return res.status(404).send("Error");
  return res.json(searchResults);
};

const mangaInfoController = async (req: Request, res: Response) => {
  console.log(req.params);
  const { id } = req.params;
  if (!id) {
    res.status(404).send({ message: "specify a manga id" });
    return;
  }
  console.log("id:", id);
  const mangaInfo = await fetchMangaInfo(id);
  console.log(mangaInfo);
  if (!mangaInfo) return res.status(404).send("Error: Manga not found");
  return res.json(mangaInfo);
};

export { mangaSearchController, mangaInfoController };
