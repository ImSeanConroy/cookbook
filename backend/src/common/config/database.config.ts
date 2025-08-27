import pg from "pg";
import { config } from "./app.config";

/**
 * Create a PostgreSQL connection pool using environment configuration.
 * Using a pool allows for multiple concurrent queries and better performance.
 */
const pool = new pg.Pool({
  user: config.POSTGRES_USER,
  host: config.POSTGRES_HOST,
  database: config.POSTGRES_DB,
  password: config.POSTGRES_PASSWORD,
  port: parseInt(config.POSTGRES_PORT as string),
});

/**
 * Generic query function for executing SQL statements.
 * @param text SQL query string
 * @param params Optional array of parameters for parameterized queries
 * @returns Promise resolving to pg.QueryResult
 */
export const query = (
  text: string,
  params?: unknown[]
): Promise<pg.QueryResult> => {
  return pool.query(text, params);
};

/**
 * Connects to the PostgreSQL database using the pool.
 * Logs success or exits the process on failure.
 */
const connectDatabase = async () => {
  try {
    await pool.connect();
    console.log("Connected to PostgreSQL Database using Pool");
  } catch (error) {
    console.error("Error connecting to PostgreSQL Database", error);
    process.exit(1);
  }
};

export default connectDatabase;