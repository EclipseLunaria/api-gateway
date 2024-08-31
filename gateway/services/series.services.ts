import { AppDataSource } from "../migrations/database/data-source";
import { Chapters, MangaMetadata } from "../entities";

export const getSeries = async (mangaId: string) => {
  const metadataRepo = AppDataSource.getRepository(MangaMetadata);
  const metadata = await metadataRepo.findOne({
    where: {
      manga_id: mangaId,
    },
  });
  return metadata;
};

export const getChapters = async (mangaId: string) => {
  await getSeries(mangaId);
  const chaptersRepo = AppDataSource.getRepository(Chapters);
  const chapters = await chaptersRepo.find({
    where: {
      manga_id: mangaId,
    },
  });
  return chapters;
};
