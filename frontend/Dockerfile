# ---- DEPENDENCIES ----
FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ---- DEVELOPMENT ----
FROM deps AS development
WORKDIR /app
COPY . .
CMD ["npm", "run", "dev", "--", "--host"]

# ---- BUILD ----
FROM deps AS build
WORKDIR /app
COPY . .
RUN npm run build

# ---- PRODUCTION ----
FROM nginx:alpine AS production
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY public/env.js /usr/share/nginx/html/env.js
EXPOSE 80
CMD ["/bin/sh", "-c", "envsubst '$VITE_BASE_URL $VITE_READ_ONLY' < /usr/share/nginx/html/env.js > /tmp/env.js && mv /tmp/env.js /usr/share/nginx/html/env.js && nginx -g 'daemon off;'"]