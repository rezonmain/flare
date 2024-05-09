"use server";
import { sql } from "drizzle-orm";
import { db } from "@/db/connection";
import { result } from "@/helpers/sql.helpers";
import { Role } from "@/db/schema";

const getRole = async (email: string) => {
  return result<Role>(() =>
    db.execute(
      sql`SELECT id, email, role, createdAt, updatedAt FROM roles WHERE email = ${email};`
    )
  );
};

export { getRole };
