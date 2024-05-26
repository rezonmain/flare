import type { Flare, Tag } from "@/db/schema";

type FlareWithTags = {
  tags: Tag[];
  img?: { url: string };
} & Flare;

export type { FlareWithTags };
