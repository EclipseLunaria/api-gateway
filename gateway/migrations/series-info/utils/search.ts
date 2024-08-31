import { CheerioAPI } from "cheerio";
import { SearchCategory } from "../types";

const getSearchUrl = (type: SearchCategory, page: number) => {
  switch (type) {
    case "last_updated":
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

export { getSearchUrl, extractTotalPages };
