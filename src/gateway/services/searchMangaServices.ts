import axios from "axios";
import env from "../config";
import { normalizeSearchTerm } from "../utils/searchUtils";

const searchMangaSeries = async (searchTerm: string) => {
  const normalizedSearchTerm = normalizeSearchTerm(searchTerm);
  const endpointUrl = `${env.SERIES_INFO_URL}/search?term=${normalizedSearchTerm}`;
  console.log(endpointUrl);
  try {
    const results = (await axios.get(endpointUrl)).data;
    return results;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

const fetchMangaInfo = async (id: string) => {
  const endpointUrl = `${env.SERIES_INFO_URL}/manga-${id}`;
  console.log(endpointUrl);
  try {
    const results = (await axios.get(endpointUrl)).data;
    return results;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export { searchMangaSeries, fetchMangaInfo };
