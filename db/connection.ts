import mysql from "mysql2";
import { env } from "@/config/env.mjs";
import { drizzle } from "drizzle-orm/mysql2";

const connection = mysql.createConnection({
  host: env.DATABASE_HOST,
  user: env.DATABASE_USER,
  database: env.DATABASE_NAME,
  port: parseInt(env.DATABASE_PORT),
  password: env.DATABASE_PASSWORD,
});

export const db = drizzle(connection);
