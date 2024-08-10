import path from "path";
import { config as loadEnv } from "dotenv";
import { isDev } from "./utils";

const envPath = path.resolve(
  __dirname,
  `${isDev() ? "../local.env" : "../production.env"}`
);

loadEnv({ path: envPath });
const config = loadEnv({ path: envPath }).parsed;
if (!config) {
  throw new Error(`No config found at: ${envPath}`);
}
const env = {
  SERIES_INFO_PORT: config.SERIES_INFO_PORT || 6901,
  STORAGE_PORT: config.STORAGE_PORT || 6902,
  DISTRIBUTION_PORT: config.DISTRIBUTION_PORT || 6903,
  GATEWAY_PORT: config.GATEWAY_PORT || 6900,
  DATA_LAYER_PORT: config.DATA_LAYER_PORT || 6999,
};

export default env;
