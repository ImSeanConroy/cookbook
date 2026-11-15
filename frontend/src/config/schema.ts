import { z } from "zod";

export const envSchema = z.object({
  VITE_BASE_URL: z.string().url("VITE_BASE_URL must be a valid URL"),
});
