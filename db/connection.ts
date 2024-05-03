import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { env } from "@/config/env.mjs";

const connection = await mysql.createConnection({
  host: env.DATABASE_HOST,
  user: env.DATABASE_USER,
  database: env.DATABASE_NAME,
  port: parseInt(env.DATABASE_PORT),
  password: env.DATABASE_PASSWORD,
});

const db = drizzle(connection);

export { db };
