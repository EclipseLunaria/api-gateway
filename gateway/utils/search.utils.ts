import { CheerioAPI } from "cheerio";
import { SearchCategory } from "../types";
import { parseSeries } from "../services/extraction.services";
import { getSeries } from "../services/series.services";
import { MangaMetadata } from "../entities";
import { MangaSearchResponse, MangaSeriesData } from "../models";

const normalizeQuery = (searchTerm: string) => {
  const wsCode = " ";
  console.log("pre normalization", searchTerm);

  searchTerm = searchTerm
    .split("")
    .filter((char, index) => {
      return index === 0 || char !== wsCode || searchTerm[index - 1] !== wsCode;
    })
    .filter((char) => {
      console.log(char);
      return char !== "'";
    })
    .join("")
    .trim()
    .replace(/ /g, "_");

  console.log("post normalization: ", searchTerm);
  return searchTerm;
};

const getSearchUrl = (type: SearchCategory, page: number) => {
  switch (type) {
    case "latest":
      console.log(page);
      return `https://manganato.com/genre-all/${page}`;
    case "popular":
      return `https://manganato.com/genre-all/${page}?type=topview`;
    case "newest":
      return `https://manganato.com/genre-all/${page}?type=newest`;
    default:
      return `https://manganato.com/genre-all/${page}`;
  }
};

const extractTotalPages = async ($: CheerioAPI) => {
  const totalPagesText = $(".page-last").text();
  const totalPages = totalPagesText.match(/\((\d+)\)/)?.[1];
  return totalPages ? parseInt(totalPages) : 1;
};

const extractTotalResults = async ($: CheerioAPI) => {
  const totalResults = $(".group-qty")
    .text()
    .split(" ")
    .pop()
    ?.replace(/,/g, "");
  console.log(totalResults);
  return totalResults ? parseInt(totalResults) : -1;
};

const extractSearchResults = async (
  $: CheerioAPI,
  containerClass?: string,
  imageClass?: string
) => {
  console.log("Extracting search results");
  console.log(containerClass, imageClass);
  const searchResults = $(
    containerClass ? containerClass : ".search-story-item"
  )
    .toArray()
    .map(async (element$) => {
      const imageHref = $(element$)
        .find(imageClass ? imageClass : ".item-img")
        .attr("href");
      if (!imageHref) {
        return {};
      }
      const manga_id = imageHref.split("-").pop();
      const prefetchedSeries = await getSeries(manga_id);
      if (prefetchedSeries) {
        console.log("prefetched series:", prefetchedSeries);
        return prefetchedSeries;
      }
      //series not parsed
      await parseSeries(manga_id);
      return await getSeries(manga_id);
    });

  return await Promise.all(searchResults);
};

const parsePageNumber = (pageString: string) => {
  return pageString && parseInt(pageString.toString()) > 0
    ? parseInt(pageString.toString())
    : 1;
};

export {
  normalizeQuery,
  getSearchUrl,
  parsePageNumber,
  extractTotalPages,
  extractTotalResults,
  extractSearchResults,
};
