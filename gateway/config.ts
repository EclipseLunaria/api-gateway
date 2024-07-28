import { configDotenv, config as loadEnv } from "dotenv";
import { cleanEnv, str, port, CleanedEnvAccessors } from "envalid";
import path from "path";
import { isDev } from "./utils";
const envPath = path.resolve(
  __dirname,
  `${isDev() ? "../local.env" : "../production.env"}`
);
console.log("Loading .env file from:", envPath);
console.log("isDev:", isDev());
loadEnv({ path: envPath });
const config = configDotenv({ path: envPath }).parsed;

if (!config) {
  throw new Error(`No config found at: ${envPath}`);
}
const env = {
  SERIES_INFO_PORT: config.SERIES_INFO_PORT || 6901,
  STORAGE_PORT: config.STORAGE_PORT || 6902,
  DISTRIBUTION_PORT: config.DISTRIBUTION_PORT || 6903,
  GATEWAY_PORT: config.GATEWAY_PORT || 6900,
};
export default env;
