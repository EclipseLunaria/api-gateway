import path from "path";
import { config as loadEnv } from "dotenv";
import "dotenv/config";

const env = {
  SERIES_INFO_PORT: process.env.SERIES_INFO_PORT || 6901,
  STORAGE_PORT: process.env.STORAGE_PORT || 6902,
  DISTRIBUTION_PORT: process.env.DISTRIBUTION_PORT || 6903,
  GATEWAY_PORT: process.env.GATEWAY_PORT || 6900,
  DATA_LAYER_PORT: process.env.DATA_LAYER_PORT || 6999,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
};

export default env;
