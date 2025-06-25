import { getEnv } from "../../utils/get-env"

const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "5000"),
  BASE_PATH: getEnv("BASE_PATH", "/api"),

  SESSION_SECRET: getEnv("SESSION_SECRET"),

  POSTGRES_USER: getEnv("POSTGRES_USER"),
  POSTGRES_HOST: getEnv("POSTGRES_HOST"),
  POSTGRES_DB: getEnv("POSTGRES_DB"),
  POSTGRES_PASSWORD: getEnv("POSTGRES_PASSWORD"),
  POSTGRES_PORT: getEnv("POSTGRES_PORT"),

  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "localhost"),
});

export const config = appConfig();