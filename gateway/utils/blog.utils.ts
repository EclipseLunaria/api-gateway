import axios from "axios";

const blogAPI = axios.create({
  baseURL: "https://dev.to/api/",
  timeout: 1000,
  headers: {
    "api-key": process.env.BLOG_API_KEY,
    "Content-Type": 'application/json'
  },
});

export { blogAPI };
