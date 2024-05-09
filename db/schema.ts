import {
  FLARE_BODY_MAX_LENGTH,
  FLARE_ID_LENGTH,
} from "@/constants/flare.constants";
import { FlareCategory } from "@/constants/flare.enums";
import { TAGS_NAME_MAX_LENGTH } from "@/constants/tags.constants";
import { TIME_FIELDS_LENGTH } from "@/constants/time.constants";
import {
  USER_EMAIL_MAX_LENGTH,
  USER_ID_LENGTH,
} from "@/constants/user.constants";
import { UserRoles } from "@/constants/user.enums";
import { listValues } from "@/helpers/utils.helpers";
import { sql } from "drizzle-orm";

export const flares = sql.raw(`CREATE TABLE IF NOT EXISTS flares (
  id VARCHAR(${FLARE_ID_LENGTH}) PRIMARY KEY NOT NULL,
  category ENUM(${listValues(FlareCategory)}) DEFAULT '${
  FlareCategory.CHECK_IN
}',
  body VARCHAR(${FLARE_BODY_MAX_LENGTH}) NOT NULL,
  createdAt VARCHAR(${TIME_FIELDS_LENGTH}) NOT NULL,
  updateAt VARCHAR(${TIME_FIELDS_LENGTH}),
  location POINT NOT NULL,
  SPATIAL INDEX(location)
);`);
export type Flare = {
  id: string;
  category: FlareCategory;
  body: string;
  createdAt: string;
  updatedAt?: string;
  lat: number;
  lng: number;
};
export type NewFlare = Omit<Flare, "id" | "createdAt" | "updatedAt">;

export const tags = sql`CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(${TAGS_NAME_MAX_LENGTH}) NOT NULL,
  createdAt VARCHAR(${TIME_FIELDS_LENGTH}) NOT NULL,
  updatedAt VARCHAR(${TIME_FIELDS_LENGTH}),
  UNIQUE INDEX unique_idx_name (name)
);`;
export type Tag = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt?: string;
};
export type NewTag = Omit<Tag, "id" | "updatedAt">;

export const flareTags = sql`CREATE TABLE IF NOT EXISTS flare_tags (
  flareId VARCHAR(${FLARE_ID_LENGTH}) NOT NULL,
  tagId BIGINT UNSIGNED NOT NULL,
  createdAt VARCHAR(${TIME_FIELDS_LENGTH}) NOT NULL,
  FOREIGN KEY (flareId) REFERENCES flares(id),
  FOREIGN KEY (tagId) REFERENCES tags(id)
);`;
export type FlareTag = {
  flareId: string;
  tagId: number;
  createdAt: string;
};
export type NewFlareTag = Omit<FlareTag, "createdAt">;

export const medias = sql`CREATE TABLE IF NOT EXISTS medias (
  id SERIAL PRIMARY KEY,
  url VARCHAR(512) NOT NULL,
  type ENUM('IMAGE', 'VIDEO') DEFAULT 'IMAGE',
  flareId VARCHAR(${FLARE_ID_LENGTH}) NOT NULL,
  createdAt VARCHAR(${TIME_FIELDS_LENGTH}) NOT NULL,
  updatedAt VARCHAR(${TIME_FIELDS_LENGTH}),
  FOREIGN KEY (flareId) REFERENCES flares(id)
);`;
export type Media = {
  id: number;
  url: string;
  type: "IMAGE" | "VIDEO";
  flareId: string;
  createdAt: string;
  updatedAt?: string;
};
export type NewMedia = Omit<Media, "id" | "updatedAt">;

export const roles = sql.raw(`CREATE TABLE IF NOT EXISTS roles (
  id VARCHAR(${USER_ID_LENGTH}) PRIMARY KEY NOT NULL,
  email VARCHAR(${USER_EMAIL_MAX_LENGTH}) NOT NULL,
  role ENUM(${listValues(UserRoles)}) NOT NULL,
  createdAt VARCHAR(${TIME_FIELDS_LENGTH}) NOT NULL,
  updatedAt VARCHAR(${TIME_FIELDS_LENGTH}),
  UNIQUE INDEX unique_idx_email (email)
);`);
export type Role = {
  id: string;
  email: string;
  role: UserRoles;
  createdAt: string;
  updatedAt?: string;
};
export type NewRole = Omit<Role, "id" | "createdAt" | "updatedAt">;

export const TABLE_STATEMENTS = [flares, tags, flareTags, medias, roles];
