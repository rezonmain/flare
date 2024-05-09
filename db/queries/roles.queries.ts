"use server";
import { sql } from "drizzle-orm";
import { db } from "@/db/connection";
import { result, results } from "@/helpers/sql.helpers";
import { Role } from "@/db/schema";
import { generateUserId } from "@/helpers/user.helpers";
import { ISONow } from "@/helpers/time.helpers";
import { z } from "zod";
import { UserRoles } from "@/constants/user.enums";
import { revalidatePath } from "next/cache";

const newRoleSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
  role: z.nativeEnum(UserRoles),
});

const getRole = async (email: string) => {
  return result<Role>(() =>
    db.execute(
      sql`SELECT id, email, role, createdAt, updatedAt FROM roles WHERE email = ${email};`
    )
  );
};

const insertRole = async (formData: FormData) => {
  const payload = newRoleSchema.safeParse({
    email: formData.get("email"),
    role: formData.get("role"),
  });

  if (!payload.success) {
    return {
      errors: payload.error.flatten().fieldErrors,
    };
  }

  const userId = generateUserId();
  const createdAt = ISONow();
  await db.execute(
    sql`
        INSERT INTO roles (id, email, role, createdAt) VALUES (${userId}, ${payload.data.email}, ${payload.data.role}, ${createdAt});
      `
  );
  revalidatePath("/super-user");
};

const getRoles = async () => {
  return results<Role>(() =>
    db.execute(sql`SELECT id, email, role, createdAt, updatedAt FROM roles;`)
  );
};

export { getRole, insertRole, getRoles };
