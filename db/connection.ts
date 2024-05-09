import mysql from "mysql2";
import { env } from "@/config/env.mjs";
import { drizzle } from "drizzle-orm/mysql2";

// Singleton function to ensure only one db instance is created
function singleton<Value>(name: string, value: () => Value): Value {
  const globalAny: any = global;
  globalAny.__singletons = globalAny.__singletons || {};

  if (!globalAny.__singletons[name]) {
    globalAny.__singletons[name] = value();
  }

  return globalAny.__singletons[name];
}

// Function to create the database connection and apply migrations if needed
function createDatabaseConnection() {
  const connection = mysql.createConnection({
    host: env.DATABASE_HOST,
    user: env.DATABASE_USER,
    database: env.DATABASE_NAME,
    port: parseInt(env.DATABASE_PORT),
    password: env.DATABASE_PASSWORD,
  });
  return drizzle(connection);
}

export const db = singleton("db", createDatabaseConnection);
