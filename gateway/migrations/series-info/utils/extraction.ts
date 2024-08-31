import axios from "axios";
import { load, CheerioAPI } from "cheerio";
import { seriesParsingConfig } from "../../../config/parsingConfig";
import { parseFields } from "../services/parsing";
import { MangaSeriesData } from "../models/seriesModels";
/**
 * Extracts the HTML content of a web page using the provided URL.
 * @param url - The URL of the web page to extract HTML from.
 * @returns A Promise that resolves to a Cheerio object representing the parsed HTML.
 */
const extractPageHtml = async (url: string): Promise<CheerioAPI> => {
  let html = "";
  try {
    const response = await axios.get(url);
    html = response.data;
    return load(html);
  } catch (error: any) {
    console.log(error);
    throw new Error("Internal server error");
  }
};

const parsePageNumber = (pageString: string) => {
  return pageString && parseInt(pageString.toString()) > 0
    ? parseInt(pageString.toString())
    : 1;
};

const getMangaUrl = (manga_id: string) =>
  `https://chapmanganato.to/manga-${manga_id}`;

export { extractPageHtml, getMangaUrl, parsePageNumber };
