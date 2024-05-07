import { db } from "@/db/connection";
import { sql } from "drizzle-orm";

const getVersion = async () => {
  const [result, extra] = await db.execute(sql`SELECT VERSION() as version`);
  console.log({ result, extra });
  process.exit(0);
};

getVersion();
