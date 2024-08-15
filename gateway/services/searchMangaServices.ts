import axios from "axios";
import env from "../config";
import { normalizeQuery } from "../utils/searchUtils";
import { SearchCategory } from "../types";

const BASE_URL = `http://localhost:${env.SERIES_INFO_PORT}`;
const searchMangaSeries = async (q: string) => {
  const query = normalizeQuery(q);
  const endpointUrl = `${BASE_URL}/search?q=${query}`;
  console.log(endpointUrl);
  try {
    const results = (await axios.get(endpointUrl)).data;
    return results;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

const getSeriesList = async (type: SearchCategory) => {
  const endpoints = {
    last_updated: `${BASE_URL}/latest/updated`,
    popular: `${BASE_URL}/most/popular`,
    newest: `${BASE_URL}/newest`,
  };
  const endpointUrl = endpoints[type];
  console.log(endpointUrl);
  try {
    const results = (await axios.get(endpointUrl)).data;
    return results;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

const fetchMangaInfo = async (mangaId: string) => {
  const endpointUrl = `${BASE_URL}/manga/${mangaId}`;
  console.log(endpointUrl);
  try {
    let results = {
      ...(await axios.get(endpointUrl)).data,
      chapters: await fetchChapterList(mangaId),
    };
    return results;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

const fetchChapterList = async (mangaId: string) => {
  const endpointUrl = `${BASE_URL}/manga/${mangaId}/chapters`;
  console.log(endpointUrl);
  try {
    const results = (await axios.get(endpointUrl)).data;
    return results;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

const fetchMangaFields = async (mangaId: string, fieldId: string) => {
  const endpointUrl = `${BASE_URL}/manga/${mangaId}/${fieldId}`;
  console.log(endpointUrl);
  try {
    const results = (await axios.get(endpointUrl)).data;
    return results;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export {
  searchMangaSeries,
  getSeriesList,
  fetchMangaInfo,
  fetchChapterList,
  fetchMangaFields,
};
