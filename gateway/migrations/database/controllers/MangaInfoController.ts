import { SeriesInfo } from "../types/seriesInfo";
import { Request, Response } from "express";
import { getChapters, uploadSeries } from "../services/SeriesInfoServices";
import { getSeries } from "../services/SeriesInfoServices";

const uploadSeriesController = async (req: Request, res: Response) => {
  const seriesInfo: SeriesInfo = req.body;
  console.log(seriesInfo);
  try {
    await uploadSeries(seriesInfo);
    res.status(200).send("Series uploaded successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

const fetchSeriesController = async (req: Request, res: Response) => {
  const mangaId = req.params.mangaId;
  try {
    const series = await getSeries(mangaId);
    res.status(200).send(series);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

const fetchFieldController = async (req: Request, res: Response) => {
  const mangaId = req.params.mangaId;
  const field = req.params.field;
  try {
    const series = await getSeries(mangaId);
    if (!series) {
      res.status(404).send("Series not found");
      return;
    }
    if (field === "chapters") {
      const chapters = await getChapters(mangaId);
      res.status(200).send(chapters);
    } else {
      res.status(200).send(series[field]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

export { uploadSeriesController, fetchSeriesController, fetchFieldController };
