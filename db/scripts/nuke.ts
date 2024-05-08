import { sql } from "drizzle-orm";
import { db } from "@/db/connection";
import { results } from "@/helpers/sql.helpers";

const nuke = async () => {
  await db.transaction(async (tx) => {
    db.execute(sql`SET FOREIGN_KEY_CHECKS = 0`);
    const tableNames = await results<{ TABLE_NAME: string }>(() =>
      tx.execute(
        sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'flare';`
      )
    );
    tableNames.forEach(async (tableName) => {
      await tx.execute(
        sql.raw(`DROP TABLE IF EXISTS ${tableName.TABLE_NAME};`)
      );
      console.log(`Dropped table ${tableName.TABLE_NAME}`);
    });
    db.execute(sql`SET FOREIGN_KEY_CHECKS = 1`);
  });
  console.log("All tables dropped successfully.");
  process.exit(0);
};

nuke();
