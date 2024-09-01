import { Request, Response } from "express";
import { getChapters, getSeries } from "../services/series.services";
import { parseSeries } from "../services/extraction.services";

const infoController = async (req: Request, res: Response) => {
  console.log(req.params);
  const { mangaId } = req.params;
  if (!mangaId) {
    res.status(404).send({ message: "specify a manga id" });
    return;
  }
  // try prefetch
  console.log("mangaId:", mangaId);
  const mangaInfo = await getSeries(mangaId);
  if (mangaInfo) {
    res.json(mangaInfo);
    return;
  }
  //parse Series info
  try {
    await parseSeries(mangaId);
    res.json(await getSeries(mangaId));
    return;
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const chapterController = async (req: Request, res: Response) => {
  const { mangaId } = req.params;
  if (!mangaId) {
    res.status(404).send({ message: "specify a manga id." });
    return;
  }
  const chapterList = await getChapters(mangaId);
  if (!chapterList) return res.status(404).send("Error: Chapter not found.");
  return res.json(chapterList);
};

const fieldController = async (req: Request, res: Response) => {
  const { mangaId, fieldId } = req.params;
  if (!mangaId || !fieldId) {
    res.status(404).send({ message: "specify a manga id and field." });
    return;
  }
  const series = await getSeries(mangaId);
  if (!Object.keys(series).includes(fieldId))
    return res.status(404).send("Error: Field not found.");
  return res.json(series[fieldId]);
};

export { infoController, chapterController, fieldController };
