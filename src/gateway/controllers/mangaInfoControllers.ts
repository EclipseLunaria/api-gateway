import { Request, Response } from "express";
import { normalizeSearchTerm } from "../utils/searchUtils";

const mangaSearchController = (req: Request, res: Response) => {
  const { term } = req.query;
  if (!term) {
    res.status(404).send({ message: "specify a search term" });
    return;
  }
  const normalizedSearchTerm = normalizeSearchTerm(term.toString());
  
  return res.send(term);
};

export { mangaSearchController };
