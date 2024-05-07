import { sql } from "drizzle-orm";
import { db } from "@/db";

const getDBVersion = async () => {
  const [res] = (await db.execute(sql`SELECT VERSION();`)) as any;
  return res[0]["VERSION()"];
};

export { getDBVersion };
