import { MangaMetadata, Chapters } from "../entities";
import { AppDataSource } from "../data-source";
import { SeriesInfo } from "../types/seriesInfo";

export const uploadSeries = async (seriesInfo: SeriesInfo) => {
  console.log("Uploading series...");
  console.log("rating", seriesInfo)
  const metadataRepo = AppDataSource.getRepository(MangaMetadata);
  const metadata = new MangaMetadata();
  metadata.manga_id = seriesInfo.manga_id;
  metadata.title = seriesInfo.title;
  metadata.author = seriesInfo.author;
  metadata.image = seriesInfo.image;
  // metadata.totalVotes = seriesInfo.rating.totalVotes;
  // metadata.ratingAvg = seriesInfo.rating.ratingAvg;
  metadata.description = seriesInfo.description;
  metadata.status = seriesInfo.status;
  metadata.genres = seriesInfo.genres;
  metadata.totalChapters = seriesInfo.totalChapters;
  await metadataRepo.save(metadata);
  console.log("Series uploaded successfully");

  console.log("Uploading chapters...");
  const chaptersRepo = AppDataSource.getRepository(Chapters);
  // get current chapters

  const currentChapters = await chaptersRepo.find({
    where: {
      manga_id: metadata.manga_id,
    },
  });
  if (currentChapters.length === metadata.totalChapters) {
    console.log("Chapters already uploaded");
    return;
  }
  for (const chapter of seriesInfo.chapters) {
    if (currentChapters.find((c) => c.chapter_id === chapter.chapter_id)) {
      continue;
    }
    const newChapter = new Chapters();
    newChapter.manga_id = metadata.manga_id;
    newChapter.chapter_id = chapter.chapter_id;
    newChapter.title = chapter.title;
    newChapter.link = chapter.link;

    await chaptersRepo.save(newChapter);
    console.log(`Chapter ${chapter.chapter_id} uploaded successfully`);
  }
};

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
