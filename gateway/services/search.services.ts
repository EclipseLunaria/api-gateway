import axios from "axios";
import env from "../config";
import { SearchCategory } from "../types";
import MangaSearchResponse from "../models/mangaSearchResponse";
import SearchResponse from "../models/searchResponse";

const SEARCH_SERVICE_URL = `http://localhost:${env.SERIES_INFO_PORT}`;

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
  const endpoints = {
    latest: `${SEARCH_SERVICE_URL}/latest/updated`,
    popular: `${SEARCH_SERVICE_URL}/most/popular`,
    newest: `${SEARCH_SERVICE_URL}/latest/added`,
  };
  let totalResultCount: number = 0;
  const results = [...Array(LAST_PAGE - START_PAGE + 1)]
    .map((_, i) => i + START_PAGE)
    .map(async (page) => {
      const url = `${endpoints[type]}?page=${page}`;
      console.log(url);
      // Create Axios API instance for calling series info api
      const response = await axios.get(`${endpoints[type]}?page=${page}`);

      const data: MangaSearchResponse = await response.data;
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
      series.chapters = undefined;
      return series;
    });
  return {
    totalResults: totalResultCount,
    offset: offset,
    limit: limit,
    results: data,
  } as SearchResponse;
};

export default getPaginatedSeriesList;
