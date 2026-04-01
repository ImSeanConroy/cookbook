import { z } from "zod";

export const envSchema = z.object({
  VITE_BASE_URL: z.string().url("VITE_BASE_URL must be a valid URL"),

  VITE_READ_ONLY: z
    .string()
    .optional()
    .transform((val) => val === "true"),
});
