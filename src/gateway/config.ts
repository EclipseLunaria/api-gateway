import { config as loadEnv } from "dotenv";
import { cleanEnv, str, port, CleanedEnvAccessors } from "envalid";
import path from "path";
import { isDev } from "./utils";
const envPath = path.resolve(
  __dirname,
  `${isDev() ? "../../local.env" : "../../docker.env"}`
);
console.log("Loading .env file from:", envPath);
console.log("isDev:", isDev());
loadEnv({ path: envPath });

interface EnvVars extends CleanedEnvAccessors {
  SERIES_INFO_URL: string;
  STORAGE_SERVICE_URL: string;
  EXTRACTION_SERVICE_URL: string;
  DATABASE_SERVICE_URL: string;
  PORT: number;
}

export const env = cleanEnv(process.env, {
  SERIES_INFO_URL: str(),
  STORAGE_SERVICE_URL: str(),
  EXTRACTION_SERVICE_URL: str(),
  PORT: port(),
  DATABASE_SERVICE_URL: str(),
}) as EnvVars;

export default env;
