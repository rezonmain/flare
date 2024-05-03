import {
  mysqlTable,
  uniqueIndex,
  varchar,
  serial,
} from "drizzle-orm/mysql-core";

// declaring enum in database
export const tests = mysqlTable(
  "tests",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
  },
  (tests) => ({
    nameIndex: uniqueIndex("name_idx").on(tests.name),
  })
);
