import { config as loadEnv } from 'dotenv';
import { cleanEnv, str, port, CleanedEnvAccessors } from 'envalid';

loadEnv();

interface EnvVars extends CleanedEnvAccessors {
  STORAGE_SERVICE_URL: string;
  EXTRACTION_SERVICE_URL: string;
  SERIES_PARSING_SERVICE_URL: string;
  PORT: number;
}

export const env = cleanEnv(process.env, {
    STORAGE_SERVICE_URL: str(),
    EXTRACTION_SERVICE_URL: str(),
    SERIES_PARSING_SERVICE_URL: str(),
    PORT: port(),
}) as EnvVars;

export default env;
