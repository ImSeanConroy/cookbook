export const config = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  READ_ONLY: import.meta.env.VITE_READ_ONLY === "true",
};