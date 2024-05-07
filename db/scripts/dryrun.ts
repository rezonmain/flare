import { TABLE_STATEMENTS } from "@/db/schema";

const dryRun = () => {
  console.log(TABLE_STATEMENTS.map((table) => table));
};

dryRun();
