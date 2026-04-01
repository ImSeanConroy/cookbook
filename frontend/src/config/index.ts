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
  READ_ONLY: parsed.data.VITE_READ_ONLY ?? false,
};