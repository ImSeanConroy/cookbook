import pg from "pg";
import { config } from "./app.config";

const pool = new pg.Pool({
  user: config.POSTGRES_USER,
  host: config.POSTGRES_HOST,
  database: config.POSTGRES_DB,
  password: config.POSTGRES_PASSWORD,
  port: parseInt(config.POSTGRES_PORT as string),
});

export const query = (
  text: string,
  params?: unknown[]
): Promise<pg.QueryResult> => {
  return pool.query(text, params);
};

const connectDatabase = async () => {
  try {
    await pool.connect();
    console.log("Connected to PostgreSQL Database using Pool");
  } catch (error) {
    console.log("Error connecting to PostgreSQL Database");
    process.exit(1);
  }
};

export default connectDatabase;