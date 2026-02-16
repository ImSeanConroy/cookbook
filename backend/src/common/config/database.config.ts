import pg from "pg";
import { config } from "./app.config";
import { toCamelCase } from "../../utils/case-converter";

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
 * @returns Promise resolving to Promise<T[]>
 */
export const query = async <T = any>(
  text: string,
  params?: unknown[]
): Promise<T[]> => {
  const res = await pool.query(text, params);
  return toCamelCase(res.rows);
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