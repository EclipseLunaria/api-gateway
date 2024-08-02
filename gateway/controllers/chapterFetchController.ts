import { Request, Response } from "express";
import { fetchChapter } from "../services/chapterFetchService";

export const chapterFetchController = async (req: Request, res: Response) => {
  try {
    const { mangaId, chapterId } = req.params;
    console.log(mangaId, chapterId);
    const chapter = await fetchChapter(mangaId, chapterId);
    res.json(chapter);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
