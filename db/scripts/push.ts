import { sql } from "drizzle-orm";
import { db } from "@/db/connection";
import { TABLE_STATEMENTS } from "@/db/schema";

const push = async () => {
  await db.execute(sql`START TRANSACTION;`);
  TABLE_STATEMENTS.forEach(async (table) => {
    await db.execute(table);
  });
  await db.execute(sql`COMMIT;`);
  process.exit(0);
};

push();
