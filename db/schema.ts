import { FLARE_ID_LENGTH } from "@/constants/flare.constants";
import { generateFlareId } from "@/helpers/flare.helpers";
import {
  mysqlTable,
  uniqueIndex,
  varchar,
  serial,
  mysqlEnum,
  int,
} from "drizzle-orm/mysql-core";

export const flare = mysqlTable("flares", {
  id: varchar("id", { length: FLARE_ID_LENGTH })
    .$defaultFn(generateFlareId)
    .primaryKey(),
  category: mysqlEnum("category", [
    "INFORMATION",
    "EVENT",
    "SELL",
    "CHECK_IN",
    "DISCUSSION",
  ]).default("CHECK_IN"),
  body: varchar("body", { length: 2048 }).notNull(),
});
export type NewFlare = typeof flare.$inferInsert;

export const tag = mysqlTable(
  "tags",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 64 }).notNull(),
  },
  (tag) => ({
    nameIndex: uniqueIndex("name_idx").on(tag.name),
  })
);
export type NewTag = typeof tag.$inferInsert;

export const flareTag = mysqlTable("flare_tags", {
  flareId: int("flare_id").references(() => flare.id),
  tagId: int("tag_id").references(() => tag.id),
});
export type NewFlareTag = typeof flareTag.$inferInsert;

export const media = mysqlTable("media", {
  id: serial("id").primaryKey(),
  url: varchar("url", { length: 512 }),
  type: mysqlEnum("type", ["IMAGE", "VIDEO"]).default("IMAGE"),
  flareId: int("flare_id").references(() => flare.id),
});
export type NewMedia = typeof media.$inferInsert;
