import { join } from "path";
const buildServiceUrl = (baseUrl: string, path: string) => {
  return `${baseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
};

export { buildServiceUrl };
