import type { Flare, Tag } from "@/db/schema";

type FlareWithTags = {
  tags: Tag[];
} & Flare;

export type { FlareWithTags };
