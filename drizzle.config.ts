import { defineConfig } from "drizzle-kit";
import { env } from "./config/env.mjs";

export default defineConfig({
  schema: "./db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    host: env.DATABASE_HOST,
    user: env.DATABASE_USER,
    database: env.DATABASE_NAME,
    port: parseInt(env.DATABASE_PORT),
    password: env.DATABASE_PASSWORD,
  },
  verbose: true,
  strict: true,
});
