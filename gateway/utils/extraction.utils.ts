import { CheerioAPI, load } from "cheerio";
import { ParsingConfig, seriesParsingConfig } from "../config/parsingConfig";
import axios from "axios";

/**
 * Parses the fields of a CheerioAPI object based on the provided configuration.
 * @param $ - The CheerioAPI object representing the HTML to be parsed.
 * @param config - The parsing configuration object containing functions to extract specific fields.
 * @returns A promise that resolves to an object containing the parsed fields.
 */
const parseFields = async ($: CheerioAPI, config: ParsingConfig) => {
  const seriesInfo: { [key: string]: any } = {};
  const parsingPromises: Promise<any>[] = [];

  for (const [key, func] of Object.entries(config)) {
    const result = await func($);
    seriesInfo[key] = result;
    parsingPromises.push(seriesInfo[key]);
  }
  await Promise.all(parsingPromises);

  return seriesInfo;
};

const parseField = async (
  $: CheerioAPI,
  config: ParsingConfig,
  field: string
) => {
  if (!config[field]) {
    return null;
  }
  return await config[field]($);
};

const getMangaUrl = (manga_id: string) =>
  `https://chapmanganato.to/manga-${manga_id}`;

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

const getMangaPage = async (manga_id: string) => {
  const seriesUrl = getMangaUrl(manga_id);
  const $ = await extractPageHtml(seriesUrl);
  if (!$) {
    throw new Error("unable to parse html");
  }
  return $;
};

export { parseFields };
