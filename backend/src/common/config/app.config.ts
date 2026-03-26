import { getEnv } from "../../utils/get-env";

/**
 * Interface describing the shape of the application configuration object.
 */
interface AppConfig {
  BASE_PATH: string;
  NODE_ENV: string;
  PORT: string;
  READ_ONLY: string;
  LOG_LEVEL: "debug" | "info" | "warn" | "error";

  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: string;

  FRONTEND_ORIGIN: string;
}

/**
 * Reads environment variables and returns a typed configuration object.
 * Uses defaults for optional values if not specified.
 */
const appConfig = (): AppConfig => ({
  BASE_PATH: getEnv("BASE_PATH", "/api"),
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "5000"),
  READ_ONLY: getEnv("READ_ONLY", "false"),
  LOG_LEVEL: getEnv("LOG_LEVEL", "debug") as
    | "debug"
    | "info"
    | "warn"
    | "error",

    POSTGRES_USER: getEnv("POSTGRES_USER"),
  POSTGRES_PASSWORD: getEnv("POSTGRES_PASSWORD"),
  POSTGRES_DB: getEnv("POSTGRES_DB"),
  POSTGRES_HOST: getEnv("POSTGRES_HOST"),
  POSTGRES_PORT: getEnv("POSTGRES_PORT"),

  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "localhost"),
});

export const config = appConfig();