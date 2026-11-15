import { config } from "@/config"

function sanitizeUrlPart(value: string) {
  return value.replace(/\r?\n/g, "").trim()
}

function sanitizeFrontendBaseUrl(baseUrl: string) {
  const cleaned = sanitizeUrlPart(baseUrl)
  // Guard against accidental env values such as "http://localhost:5173/n".
  return cleaned.endsWith("/n") ? cleaned.slice(0, -2) : cleaned
}

export function toFrontendUrl(path: string) {
  return new URL(sanitizeUrlPart(path), sanitizeFrontendBaseUrl(config.FRONTEND_URL)).toString()
}
