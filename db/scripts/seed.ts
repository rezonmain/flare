import { env } from "@/config/env.mjs";
import { UserRoles } from "@/constants/user.enums";
import { db } from "@/db";
import { ISONow } from "@/helpers/time.helpers";
import { generateUserId } from "@/helpers/user.helpers";
import { sql } from "drizzle-orm";

const seedSuperUser = async () => {
  const email = env.SUPER_USER_EMAIL;
  const userId = generateUserId();
  const createdAt = ISONow();
  const role = UserRoles.SUPER_USER;
  await db.execute(sql`
    INSERT INTO roles (id, email, role, createdAt) VALUES (${userId}, ${email}, ${role}, ${createdAt});
`);
  console.log(`[SEED] Super user seeded`);
  process.exit(0);
};

const seeders = [seedSuperUser];

for await (const seeder of seeders) {
  seeder();
}
