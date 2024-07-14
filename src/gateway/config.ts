import { config as loadEnv } from "dotenv";
import { cleanEnv, str, port, CleanedEnvAccessors } from "envalid";
import { config } from "dotenv";
import { isDev } from "./utils";

if (isDev()) {
  config({ path: "./.env.dev" });
}
console.log(process.env);

loadEnv();

interface EnvVars extends CleanedEnvAccessors {
  SERIES_INFO_URL: string;
  // STORAGE_SERVICE_URL: string;
  // EXTRACTION_SERVICE_URL: string;
  // SERIES_PARSING_SERVICE_URL: string;
  PORT: number;
}

export const env = cleanEnv(process.env, {
  SERIES_INFO_URL: str(),
  // STORAGE_SERVICE_URL: str(),
  // EXTRACTION_SERVICE_URL: str(),
  // SERIES_PARSING_SERVICE_URL: str(),
  PORT: port(),
}) as EnvVars;

export default env;
