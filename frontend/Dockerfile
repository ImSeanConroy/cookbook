FROM node:20 AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# DEV
FROM base AS dev
COPY . .
CMD ["npm", "run", "dev", "--", "--host"]

# BUILD
FROM base AS build
COPY . .
RUN npm run build

# PROD
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
