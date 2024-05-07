import { sql } from "drizzle-orm";
import { db } from "@/db/connection";

const getDBVersion = async () => {
  return db.execute(sql`SELECT VERSION();`);
};

export { getDBVersion };
