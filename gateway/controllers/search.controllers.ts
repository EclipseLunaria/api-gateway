import { SearchCategory } from "../types";
import { Request, Response } from "express";
import getPaginatedSeriesList from "../services/search.services";

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

export default findManga;
