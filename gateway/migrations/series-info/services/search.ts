import { extractPageHtml } from "../utils";
import { MangaSearchResponse } from "../models/searchModels";
import { extractTotalPages, getSearchUrl } from "../utils/search";
import { SearchCategory } from "../types";


const latestSeriesService = async (page: number, type: SearchCategory) => {
  const seriesUrl = getSearchUrl(type, page);
  console.log(seriesUrl);
  const $ = await extractPageHtml(seriesUrl);
  if (!$) {
    throw new Error("Internal server error");
  }
  const searchResponse: MangaSearchResponse = {
    page: page,
    totalPages: await extractTotalPages($),
    totalResults: await ex($),
    results: await extractSearchResults(
      $,
      ".content-genres-item",
      ".genres-item-img"
    ),
  };
  return searchResponse;
};
export { searchSeriesService, latestSeriesService };
