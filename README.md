# Cookbook: all your recipes in one place

Fullstack cookbook application built using PostgreSQL, Express, React, and Node.

## Table of Contents

- [Getting Started](#getting-started)
    - [1. Prerequisites](#1-prerequisites)
    - [2. Installation](#2-installation)
    - [3. Frontend Setup:](#3-frontend-setup)
    - [4. Backend \& Database Setup:](#4-backend--database-setup)
- [Development and Testing](#development-and-testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Getting Started

### 1. Prerequisites
Before getting started, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### 2. Installation

Follow these steps to set up the application locally:

1. **Clone the repository**:

```bash
git clone https://github.com/imseanconroy/cookbook.git
cd cookbook
```

### 3. Frontend Setup:

  1. **Install Dependencies**: Navigate to the `frontend` directory and install required dependencies:
  ```bash
  cd frontend
  npm install
  ```

  2. **Configure Environment Variables**: Create a `.env` file in the frontend directory with the following content:
  ```env
  VITE_API_BASE_URL=http://localhost:8000
  ```

  3. **Start Frontend Development Server**: Run the following command to start the frontend development server:
  ```bash
  npm run dev
  ```

### 4. Backend & Database Setup:

  1. **Install Backend Dependencies**: Navigate to the `backend` directory and install the required dependencies:
  ```bash
  cd backend
  npm install
  ```

  2. **Configure Environment Variables**: Create a `.env` file in the `backend` directory with the following content:
  ```env
  PORT=8000
  NODE_ENV=development
  READ_ONLY=false

  SESSION_SECRET=example
  SESSION_EXPIRES_IN=1d

  FRONTEND_ORIGIN=http://localhost:5173

  PGADMIN_DEFAULT_EMAIL=<pg_admin_email>
  PGADMIN_DEFAULT_PASSWORD=<pg_admin_password>

  POSTGRES_PASSWORD=<database_password>
  POSTGRES_USER=<database_user>
  POSTGRES_DB=<database_name>
  POSTGRES_PORT=5432
  POSTGRES_HOST=localhost

  DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
  ```

  3. **Start Docker Container**: Run the following command to start the Docker container:
  ```env
  docker compose up -d
  ```
   
  4. **Access PGAdmin**: Open your browser and go to `localhost:5050` to log in to PGAdmin using the credentials defined in the .env file. Once logged in, connect to PostgreSQL and connect to the database matching the name defined in `{POSTGRES_DB}`.
   
  5. **Run Database Migrations**: Use PG-migrate to set up the database tables by running:
  ```
  DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB} npm run migrate:up
  ```

  6. **Start Backend Development Server**: Run the following command to start the backend development server:
  ```bash
  npm run dev
  ```

## Development and Testing

Run all backend tests with the following command:
```bash
cd backend
npm run test
```

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
│   │   ├── middleware/        # Request processing logic (e.g., auth, logging)
│   │   ├── repositories/      # Database queries and schema models
│   │   ├── routes/            # API endpoint definitions
│   │   ├── services/          # Core business logic
│   │   └── util/              # Utility functions (e.g., validation, logging)
└── README.md                  # Project documentation
```

## Contributing

Contributions are welcome. Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is Distributed under the MIT License - see the [LICENSE](LICENSE) file for information.

## Support

If you are having problems, please let me know by [raising a new issue](https://github.com/ImSeanConroy/cookbook/issues/new/choose).
