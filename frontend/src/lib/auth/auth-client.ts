import { createAuthClient } from "better-auth/react"
import { AUTH_ROUTES } from "@/routes/common/route-paths"
import { inferAdditionalFields } from "better-auth/client/plugins";
import { config } from "@/config"

export const authClient = createAuthClient({
  baseURL: config.BACKEND_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        onboarded: {
          type: "boolean"
        }
      }
  })
  ],
})