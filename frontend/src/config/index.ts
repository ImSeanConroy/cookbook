import { envSchema } from "./schema";
import { getAllEnv } from "./env";

const rawEnv = getAllEnv();

const parsed = envSchema.safeParse(rawEnv);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.format());
  throw new Error("Invalid environment configuration");
}

export const config = {
  BASE_URL: parsed.data.VITE_BASE_URL,
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173",
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || "http://localhost:9001",
};