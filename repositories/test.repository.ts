import { db, tests } from "@/db";

const getTestEntries = async () => {
  return await db.select().from(tests);
};

export { getTestEntries };
