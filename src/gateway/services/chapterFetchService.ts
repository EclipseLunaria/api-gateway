import axios from "axios";

export const fetchChapter = async (mangaId: string, chapterId: string) => {
  const EXTRACTION_SERVICE_URL =
    process.env.EXTRACTION_SERVICE_URL || "http://localhost:6967";
  console.log(
    `http://${EXTRACTION_SERVICE_URL}/extract/manga-${mangaId}/chapter-${chapterId}`
  );
  const response = await axios.get(
    `http://${EXTRACTION_SERVICE_URL}/extract/manga-${mangaId}/chapter-${chapterId}`
  );
  return response.data;
};
