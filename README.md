# Cookbook: all your recipes in one place

A full-stack recipe management app built with the **PERN stack (PostgreSQL, Express, React, Node.js)**.  
Save, organize, and discover recipes all in one place — built for food lovers and home cooks.

 ![Project Colors Demo](.github/imgs/repo-img.png) 

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Option 1 — Run with Docker (Recommended)](#option-1--run-with-docker-recommended)
  - [Option 2 — Run Manually (Without Docker)](#option-2--run-manually-without-docker)
- [Development and Testing](#development-and-testing)
- [Production Deployment](#production-deployment)
- [Development Plan and Improvements](#development-plan-and-improvements)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## About the Project

Cookbook is a modern, full-stack web app that lets users create, store, and share their favorite recipes.  
It features a fast React frontend, a Node/Express API, and a PostgreSQL database for reliable data storage.

Whether you’re tracking your family’s secret recipes or exploring new cuisines, **Cookbook keeps everything organized and searchable**.

## Features

- Create, edit, and delete recipes (Under Development).
- Search recipes by name and subtitle.
- Filter recipes by cuisine, cooktime, difficulty, meal type and dietary requirements.
- Simple, responsive UI built with React, Tailwind and Shadcn.
- Dockerized backend and database setup for easy development.

## Getting Started

### Prerequisites

Before getting started, ensure you have the following installed:
- [Node.js (>=18)](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

### Option 1 — Run with Docker (Recommended)

This runs PostgreSQL, Backend, Frontend, and PGAdmin in containers:

1. **Clone the repository:**
```bash
git clone https://github.com/imseanconroy/cookbook.git
cd cookbook
```

2. **Start the development environment:**
```bash
docker compose --env-file docker/env/.env.dev -f docker/compose/docker-compose.dev.yaml up --build -d
```

3. **Run database migrations:**
```bash
docker compose --env-file docker/env/.env.dev -f docker/compose/docker-compose.dev.yaml exec backend npm run migrate:up
```

4. **Seed the database (Optional):**
```bash
docker compose --env-file docker/env/.env.dev -f docker/compose/docker-compose.dev.yaml exec backend npm run seed
```

5. **Access the application:**
 
- Frontend (React App) - http://localhost:5173
- Backend API - http://localhost:9001
- PGAdmin (Database GUI) - http://localhost:5051

6. **To get application logs:**
```bash
docker compose --env-file docker/env/.env.dev -f docker/compose/docker-compose.dev.yaml logs backend
```

7. **To stop the application:**
```bash
docker compose --env-file docker/env/.env.dev -f docker/compose/docker-compose.dev.yaml down -v
```

### Option 2 — Run Manually (Without Docker)

This runs PostgreSQL, Backend, Frontend, and PGAdmin in containers:

1. **Clone the repository:**

```bash
git clone https://github.com/imseanconroy/cookbook.git
cd cookbook
```

2. **Install backend dependencies**:
```bash
cd backend
npm install
```

3. **Configure backend environment variables**:
```env
# -------------------------
# APP (internal)
# -------------------------
NODE_ENV=development
PORT=5000
READ_ONLY=false
LOG_LEVEL=debug

# -------------------------
# DATABASE
# -------------------------
POSTGRES_USER=admin
POSTGRES_PASSWORD=root
POSTGRES_DB=cookbook
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
DATABASE_URL=postgres://admin:root@localhost:5432/cookbook

# -------------------------
# URLS
# -------------------------
FRONTEND_ORIGIN=http://localhost:5173
```

4. **Create the database tables and seed the database**:
```
DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB} npm run migrate:up && npm run seed
```

5. **Start backend express server**: 
```bash
npm run dev
```

6. **Install frontend dependencies:**
```bash
cd frontend
npm install
```

7. **Configure frontend environment variables:** 
```env
# -------------------------
# FRONTEND (VITE)
# -------------------------
VITE_BASE_URL=http://localhost:9001
VITE_READ_ONLY=false
```

8. **Start the frontend react application:**
```bash
npm run dev
```

## Development and Testing

Run all backend tests with the following command:
```bash
cd backend
npm run test
``` 

## Production Deployment

The pre-built Docker images on Docker Hub use **runtime environment injection** for the frontend — environment variables are substituted into the served `env.js` file each time the container starts, so a single image works with any configuration.

### Prerequisites

- An EC2 instance (Ubuntu recommended) with Docker and Docker Compose installed.
- Ports **80** (or your chosen `FRONTEND_PORT`) and **5000** (or `BACKEND_PORT`) open in the EC2 security group.
- A domain name pointed at the EC2 public IP *(optional but recommended for HTTPS)*.

### Step 1 — Clone the repository

```bash
git clone https://github.com/imseanconroy/cookbook.git
cd cookbook
```

### Step 2 — Configure environment variables

Copy the example prod env file and fill in your values:

```bash
cp docker/env/.env.prod.example docker/env/.env.prod
nano docker/env/.env.prod
```

Key values to update:

| Variable | Description |
|---|---|
| `POSTGRES_PASSWORD` | A strong database password |
| `FRONTEND_ORIGIN` | Public URL of the frontend (e.g. `https://your-domain.com`) |
| `VITE_BASE_URL` | URL the **browser** uses to reach the API — see note below |

> **`VITE_BASE_URL` note:** The frontend nginx image includes an `/api` proxy to the backend container. If you expose only port 80, set `VITE_BASE_URL=https://your-domain.com/api`. If you expose the backend port directly (e.g. 5000), set `VITE_BASE_URL=http://your-ec2-ip:5000`.

### Step 3 — Pull and start the containers

```bash
docker compose -p cookbook --env-file docker/env/.env.prod -f docker/compose/docker-compose.prod.yaml pull
docker compose -p cookbook --env-file docker/env/.env.prod -f docker/compose/docker-compose.prod.yaml up -d
```

### Step 4 — Run database migrations

Run this once on first deploy (and again after any schema-changing release):

```bash
docker compose -p cookbook --env-file docker/env/.env.prod -f docker/compose/docker-compose.prod.yaml exec backend npm run migrate:up
```

### Step 5 — Seed the database *(optional)*

```bash
docker compose -p cookbook --env-file docker/env/.env.prod -f docker/compose/docker-compose.prod.yaml exec backend npm run seed
```

### Step 6 — Verify the deployment

```bash
# Check all containers are running
docker compose -p cookbook --env-file docker/env/.env.prod -f docker/compose/docker-compose.prod.yaml ps

# Tail logs
docker compose -p cookbook --env-file docker/env/.env.prod -f docker/compose/docker-compose.prod.yaml logs -f
```

### Updating to a new release

```bash
docker compose -p cookbook --env-file docker/env/.env.prod -f docker/compose/docker-compose.prod.yaml pull
docker compose -p cookbook --env-file docker/env/.env.prod -f docker/compose/docker-compose.prod.yaml up -d
```

Run migrations after any release that contains schema changes.

### Stopping the application

```bash
docker compose -p cookbook --env-file docker/env/.env.prod -f docker/compose/docker-compose.prod.yaml down
```

## Development Plan and Improvements

This section outlines upcoming features and improvements:

1. **User Features:**
   - Add ability to create, update and delete recipes from the fronted.
   - Add local bookmarking and “favorites” functionality.

2. **Testing and Quality Assurance:**
   - Expand test coverage for frontend components.

3. **Documentation:**
   - Create a detailed API reference.

Feel free to suggest additional improvements by [opening an issue](https://github.com/ImSeanConroy/cookbook/issues/new/choose).

## Project Structure

```
cookbook/
├── frontend/                  # React application for the user interface
├── backend/                   # Express.js server with PostgreSQL integration
│   ├── migrations/            # Database migration files
│   ├── test/                  # Backend tests
│   ├── src/                   # Backend source code
│   │   ├── config/            # Database and environment configurations
│   │   ├── controllers/       # API request handlers
│   │   ├── middleware/        # Request processing logic
│   │   ├── repositories/      # Database queries and schema models
│   │   ├── routes/            # API endpoint definitions
│   │   ├── services/          # Core business logic
│   │   └── util/              # Utility functions (e.g., validation, logging)
├── docker/                    # Docker configuration files
└── README.md                  # Project documentation
```

## Contributing

Contributions are welcome. Please open an issue or fork the repository, create a new branch (`feature/your-feature-name`) and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for information.

## Support

If you are having problems, please let me know by [raising a new issue](https://github.com/ImSeanConroy/cookbook/issues/new/choose).
