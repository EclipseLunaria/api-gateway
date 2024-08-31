import MangaSeriesData from "./mangaSeriesData";
interface MangaSearchResponse {
  totalResults: number;
  results: (MangaSeriesData | {})[];
  page: number;
  totalPages: number;
}

export default MangaSearchResponse;
