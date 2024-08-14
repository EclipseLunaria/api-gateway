import axios from "axios";
import env from "../config";
const BASE_URL = `http://localhost:${env.DISTRIBUTION_PORT}`;
export const fetchChapter = async (mangaId: string, chapterId: string) => {
  console.log(BASE_URL);
  const endpoint = `${BASE_URL}/read/${mangaId}/${chapterId}`
  console.log(endpoint)
  const response = await axios.get(endpoint);
  return response.data;
};
