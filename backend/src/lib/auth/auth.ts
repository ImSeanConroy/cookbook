import { betterAuth } from "better-auth";
import { config } from "../../common/config/app.config";
import { logger } from "../../common/config/logger.config";
import { pool } from "../../common/config/database.config"

export const auth = betterAuth({
  baseURL: config.BACKEND_URL,
  secret: config.SECRET,
  trustedOrigins: config.TRUSTED_ORIGINS,

  database: pool,

  user: {
    fields: {
      emailVerified: "email_verified",
      createdAt: "created_at",
      updatedAt: "updated_at",
      image: "image",
    },
    additionalFields: {
      onboarded: {
        type: "boolean",
        defaultValue: false,
      }
    },
  },
  session: {
    fields: {
      expiresAt: "expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
      ipAddress: "ip_address",
      userAgent: "user_agent",
      userId: "user_id",
    },
  },
  account: {
    fields: {
      accountId: "account_id",
      providerId: "provider_id",
      userId: "user_id",
      accessToken: "access_token",
      refreshToken: "refresh_token",
      idToken: "id_token",
      accessTokenExpiresAt: "access_token_expires_at",
      refreshTokenExpiresAt: "refresh_token_expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  verification: {
    fields: {
      expiresAt: "expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  emailAndPassword: {
    enabled: true,
  },  
  plugins: [],
  logger: {
    disabled: false,
    disableColors: false,
    level: (["error", "warn", "info", "debug"].includes(config.LOG_LEVEL)
      ? config.LOG_LEVEL
      : "info") as "error" | "warn" | "info" | "debug",
    log: (level, message, ...args) => {
      logger.log({
        level,
        message,
        metadata: args,
        timestamp: new Date().toISOString(),
        service: "better-auth",
      });
    },
  },
});
