import { Request, Response } from "express";
import { normalizeSearchTerm } from "../utils/searchUtils";
import { searchManga } from "../services/searchMangaServices";

const mangaSearchController = async (req: Request, res: Response) => {
  const { term } = req.query;
  if (!term) {
    res.status(404).send({ message: "specify a search term" });
    return;
  }
  const normalizedSearchTerm = normalizeSearchTerm(term.toString());
  const searchResults = await searchManga(normalizedSearchTerm);
  console.log(searchResults);
  if (!searchResults) return res.status(404).send("Error");
  return res.json(searchResults);
};

export { mangaSearchController };
