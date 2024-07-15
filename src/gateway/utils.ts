import { join } from "path";
const buildServiceUrl = (baseUrl: string, path: string) => {
  return `${baseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
};

const isDev = () => {
  // Define your logic for determining if it's a development environment
  // For example, you can check the value of an environment variable
  return process.env.ENV_MODE !== "docker";
};

export { buildServiceUrl, isDev };
