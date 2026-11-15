import { getEnv } from "../../utils/get-env";

/**
 * Interface describing the shape of the application configuration object.
 */
interface AppConfig {
  NODE_ENV: string;
  PORT: string;
  BASE_PATH: string;
  LOG_LEVEL: "debug" | "info" | "warn" | "error";

  BACKEND_URL: string;
  SECRET: string;
  TRUSTED_ORIGINS: string[];

  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: string;
}

/**
 * Reads environment variables and returns a typed configuration object.
 * Uses defaults for optional values if not specified.
 */
const appConfig = (): AppConfig => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "5000"),
  BASE_PATH: getEnv("BASE_PATH", "/api"),
  LOG_LEVEL: getEnv("LOG_LEVEL", "debug") as
    | "debug"
    | "info"
    | "warn"
    | "error",

  BACKEND_URL: getEnv("BACKEND_URL", "http://localhost:3000"),
  SECRET: getEnv("SECRET"),
  TRUSTED_ORIGINS: getEnv("TRUSTED_ORIGINS", "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  
  POSTGRES_USER: getEnv("POSTGRES_USER"),
  POSTGRES_PASSWORD: getEnv("POSTGRES_PASSWORD"),
  POSTGRES_DB: getEnv("POSTGRES_DB"),
  POSTGRES_HOST: getEnv("POSTGRES_HOST"),
  POSTGRES_PORT: getEnv("POSTGRES_PORT"),
});

export const config = appConfig();