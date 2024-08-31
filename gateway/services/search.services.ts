import axios from "axios";
import env from "../config";
import { SearchCategory } from "../types";
import MangaSearchResponse from "../models/mangaSearchResponse";
import SearchResponse from "../models/searchResponse";

import {
  extractTotalResults,
  extractTotalPages,
  extractSearchResults,
  getSearchUrl,
} from "../utils/search.utils";
import { extractPageHtml } from "../utils/extraction.utils";

const searchSeriesService = async (page: number, searchTerm: string) => {
  const seriesUrl = `https://manganato.com/search/story/${searchTerm
    .replace(/ /g, "_")
    .toLowerCase()}?page=${page}`;
  const $ = await extractPageHtml(seriesUrl);
  if (!$) {
    throw new Error("Internal server error");
  }
  const searchResponse: MangaSearchResponse = {
    page: page,
    totalPages: await extractTotalPages($),
    totalResults: await extractTotalResults($),
    results: await extractSearchResults($),
  };
  return searchResponse;
};

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
    totalResults: await extractTotalResults($),
    results: await extractSearchResults(
      $,
      ".content-genres-item",
      ".genres-item-img"
    ),
  };
  return searchResponse;
};

const getPaginatedSeriesList = async (
  type: SearchCategory,
  limit: number,
  offset: number
) => {
  const SOURCE_PAGE_SIZE = 24;
  const START_INDEX = offset % SOURCE_PAGE_SIZE;
  const START_PAGE = (offset - START_INDEX) / SOURCE_PAGE_SIZE;
  const LAST_INDEX = (offset + limit) % SOURCE_PAGE_SIZE;
  const LAST_PAGE = (offset + limit - LAST_INDEX) / SOURCE_PAGE_SIZE;
  console.log(SOURCE_PAGE_SIZE, START_INDEX, START_PAGE, LAST_INDEX, LAST_PAGE);

  let totalResultCount: number = 0;
  const results = [...Array(LAST_PAGE - START_PAGE + 1)]
    .map((_, i) => i + START_PAGE)
    .map(async (page) => {
      const data: MangaSearchResponse = await latestSeriesService(page, type);
      totalResultCount = data.totalResults;
      if (LAST_PAGE === START_PAGE) {
        return data.results.slice(START_INDEX, LAST_INDEX);
      } else if (page === START_PAGE) {
        return data.results.slice(START_INDEX);
      } else if (page === LAST_INDEX) {
        return data.results.slice(undefined, LAST_INDEX);
      } else {
        return data.results;
      }
    });
  const data = (await Promise.all(results))
    .reduce((prev, current) => prev.concat(current))
    .map((series) => {
      return series;
    });
  return {
    totalResults: totalResultCount,
    offset: offset,
    limit: limit,
    results: data,
  } as SearchResponse;
};

export { getPaginatedSeriesList, searchSeriesService };
