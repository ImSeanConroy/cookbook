FROM node:20 AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# ---- DEV ----
FROM base AS dev
COPY . .
CMD ["npm", "run", "dev"]

# ---- BUILD ----
FROM base AS build
COPY . .
RUN npm run build

# ---- PROD ----
FROM node:20 AS prod
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --omit=dev
CMD ["node", "dist/index.js"]
