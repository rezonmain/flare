import { db } from "@/db/connection";
import { TABLE_STATEMENTS } from "@/db/schema";

const push = async () => {
  await db.transaction(async (tx) => {
    TABLE_STATEMENTS.forEach(async (table) => {
      await tx.execute(table);
    });
  });
  process.exit(0);
};

push();
