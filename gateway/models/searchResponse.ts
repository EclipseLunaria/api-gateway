import MangaSeriesData from "./mangaSeriesData";
interface SearchResponse {
  totalResults: number;
  results: MangaSeriesData[];
  limit: number;
  offset: number;
}

export default SearchResponse;
