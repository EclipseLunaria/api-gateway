import axios from "axios";
import env from "../config";
const BASE_URL = `http://localhost:${env.DISTRIBUTION_PORT}`;
export const fetchChapter = async (mangaId: string, chapterId: string) => {
  console.log(BASE_URL);
  console.log(`${BASE_URL}/fetch/manga/${mangaId}/chapter/${chapterId}`);
  const response = await axios.get(
    `${BASE_URL}/fetch/manga/${mangaId}/chapter/${chapterId}`
  );
  return response.data;
};
