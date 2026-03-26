# ---- DEPENDENCIES ----
FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ---- DEVELOPMENT ----
FROM deps AS development
WORKDIR /app
COPY . .
CMD ["npm", "run", "dev"]

# ---- BUILD ----
FROM deps AS build
WORKDIR /app
COPY . .
RUN npm run build

# ---- PRODUCTION ----
FROM node:24-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev
EXPOSE 5000
CMD ["node", "dist/src/index.js"]
