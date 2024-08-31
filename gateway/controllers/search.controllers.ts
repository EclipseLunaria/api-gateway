import { SearchCategory } from "../types";
import { Request, Response } from "express";
import {
  getPaginatedSeriesList,
  searchSeriesService,
} from "../services/search.services";
import { parsePageNumber } from "../utils/search.utils";

const findManga =
  (type: SearchCategory) => async (req: Request, res: Response) => {
    let { limit, offset } = req.query;
    console.log(limit, offset);
    const parsedLimit = limit ? parseInt(limit.toString()) : 30;
    const parsedOffset = offset ? parseInt(offset.toString()) : 0;
    console.log(parsedLimit, parsedOffset);
    if (parsedLimit < 0) {
      throw new Error("limit must not be less than 0");
    }
    if (parsedOffset < 0) {
      throw new Error("offset must not be less than 0");
    }
    try {
      res.send(await getPaginatedSeriesList(type, parsedLimit, parsedOffset));
    } catch (error) {
      res.status(500).send({ message: error });
    }
  };

export const newSearchSeries = async (req: Request, res: Response) => {
  const page = parsePageNumber(req.query.page as string) || 1;
  const searchTerm = req.query.q;
  if (!searchTerm) {
    return res.status(400).json({ error: "Search term is required" });
  }
  try {
    const searchResponse = await searchSeriesService(
      page,
      searchTerm.toString()
    );
    res.status(200).json(searchResponse);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default findManga;
