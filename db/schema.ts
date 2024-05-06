import {
  FLARE_BODY_MAX_LENGTH,
  FLARE_ID_LENGTH,
} from "@/constants/flare.constants";
import { TAGS_NAME_MAX_LENGTH } from "@/constants/tags.constants";
import { TIME_FIELDS_LENGTH } from "@/constants/time.constants";
import { generateFlareId } from "@/helpers/flare.helpers";
import { ISONow } from "@/helpers/time.helpers";
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
  body: varchar("body", { length: FLARE_BODY_MAX_LENGTH }).notNull(),
  location: varchar("location", { length: 512 }).notNull(),
  createdAt: varchar("created_at", { length: TIME_FIELDS_LENGTH }).$defaultFn(
    ISONow
  ),
  updatedAt: varchar("updated_at", { length: TIME_FIELDS_LENGTH }),
});
export type NewFlare = typeof flare.$inferInsert;

export const tag = mysqlTable(
  "tags",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: TAGS_NAME_MAX_LENGTH }).notNull(),
    createdAt: varchar("created_at", { length: TIME_FIELDS_LENGTH }).$defaultFn(
      ISONow
    ),
    updatedAt: varchar("updated_at", { length: TIME_FIELDS_LENGTH }),
  },
  (tag) => ({
    nameIndex: uniqueIndex("name_idx").on(tag.name),
  })
);
export type NewTag = typeof tag.$inferInsert;

export const flareTag = mysqlTable("flare_tags", {
  flareId: int("flare_id").references(() => flare.id),
  tagId: int("tag_id").references(() => tag.id),
  createdAt: varchar("created_at", { length: TIME_FIELDS_LENGTH }).$defaultFn(
    ISONow
  ),
  updatedAt: varchar("updated_at", { length: TIME_FIELDS_LENGTH }),
});
export type NewFlareTag = typeof flareTag.$inferInsert;

export const media = mysqlTable("media", {
  id: serial("id").primaryKey(),
  url: varchar("url", { length: 512 }),
  type: mysqlEnum("type", ["IMAGE", "VIDEO"]).default("IMAGE"),
  flareId: int("flare_id").references(() => flare.id),
  createdAt: varchar("created_at", { length: TIME_FIELDS_LENGTH }).$defaultFn(
    ISONow
  ),
  updatedAt: varchar("updated_at", { length: TIME_FIELDS_LENGTH }),
});
export type NewMedia = typeof media.$inferInsert;
