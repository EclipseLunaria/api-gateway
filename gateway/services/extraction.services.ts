import { MangaMetadata } from "../entities";
import { seriesParsingConfig } from "../config/parsingConfig";
import { parseFields } from "../migrations/series-info/services/parsing";
import { extractPageHtml, getMangaUrl } from "../migrations/series-info/utils";
import { SeriesInfo } from "../models/seriesInfo";
import { uploadSeries } from "./series.services";

const parseSeries = async (manga_id: string) => {
  const seriesUrl = getMangaUrl(manga_id);
  console.log("Parsing series info from: ", seriesUrl);
  const $ = await extractPageHtml(seriesUrl);
  if (!$) {
    throw new Error("Internal server error");
  }
  const seriesInfo = {
    manga_id: manga_id,
    ...(await parseFields($, seriesParsingConfig)),
  } as SeriesInfo;

  await uploadSeries(seriesInfo);

  return seriesInfo as SeriesInfo;
};

export { parseSeries };
