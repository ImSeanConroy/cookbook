import { getEnv } from "../../utils/get-env";

/**
 * Interface describing the shape of the application configuration object.
 */
interface AppConfig {
  NODE_ENV: string;
  PORT: string;
  READ_ONLY: string;
  BASE_PATH: string;
  LOG_LEVEL: "debug" | "info" | "warn" | "error";

  POSTGRES_USER: string;
  POSTGRES_HOST: string;
  POSTGRES_DB: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_PORT: string;

  FRONTEND_ORIGIN: string;
}

/**
 * Reads environment variables and returns a typed configuration object.
 * Uses defaults for optional values if not specified.
 */
const appConfig = (): AppConfig => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "5000"),
  READ_ONLY: getEnv("READ_ONLY", "false"),
  BASE_PATH: getEnv("BASE_PATH", "/api"),
  LOG_LEVEL: getEnv("LOG_LEVEL", "debug") as
    | "debug"
    | "info"
    | "warn"
    | "error",

  POSTGRES_USER: getEnv("POSTGRES_USER"),
  POSTGRES_HOST: getEnv("POSTGRES_HOST"),
  POSTGRES_DB: getEnv("POSTGRES_DB"),
  POSTGRES_PASSWORD: getEnv("POSTGRES_PASSWORD"),
  POSTGRES_PORT: getEnv("POSTGRES_PORT"),

  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "localhost"),
});

export const config = appConfig();