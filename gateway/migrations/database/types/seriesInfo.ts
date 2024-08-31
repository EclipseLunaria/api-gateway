export type SeriesInfo = {
  manga_id: string;
  title: string;
  author: string;
  image: string;
  rating: {
    ratingAvg: string;
    totalVotes: string;
  };
  description: string;
  status: string;
  genres: string[];
  chapters: {
    chapter_id: string;
    title: string;
    link: string;
  }[];
  totalChapters: number;
};
