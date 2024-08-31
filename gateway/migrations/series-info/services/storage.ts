import axios from "axios";
import { AppDataSource } from "../../database/data-source";
import { Chapters, MangaMetadata } from "../../../entities";

const hasSeriesInfo = async (seriesId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:${6999}/series/${seriesId}`
    );
    return response.status === 200;
  } catch (error: any) {
    console.log("Unable to check series information");
    console.error(error.message);
  }
};

const getSeriesInfo = async (seriesId: string) => {
  try {
    console.log("in get series info");
    const response = await getSeries(seriesId);
    return response;
  } catch (error: any) {
    console.log("Unable to retrieve series information");
    console.error(error.message);
  }
};

const fetchSeriesField = async (seriesId: string, field: string) => {
  try {
    const response = await axios.get(
      `http://localhost:${6999}/series/${seriesId}/${field}`
    );

    return response.data;
  } catch (error: any) {
    console.log("Unable to retrieve series information");
    console.error(error.message);
  }
};

const storeSeriesInfo = async (seriesInfo: any) => {
  try {
    const response = await axios.post(
      `http://localhost:${6999}/series/upload`,
      seriesInfo
    );
  } catch (error: any) {
    console.log("Unable to store series information");
    console.error(error.message);
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

export { storeSeriesInfo, getSeriesInfo, hasSeriesInfo, fetchSeriesField };
