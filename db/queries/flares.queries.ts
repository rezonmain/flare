"use server";
import { sql } from "drizzle-orm";
import { z } from "zod";
import { generateFlareId } from "@/helpers/flare.helpers";
import { ISONow } from "@/helpers/time.helpers";
import { makePoint } from "@/helpers/geo.helpers";
import { FLARE_CREATE_SCHEMA } from "@/constants/flare.constants";
import { result, results } from "@/helpers/sql.helpers";
import { nil } from "@rezonmain/utils-nil";
import { db } from "@/db";
import { Flare } from "@/db/schema";
import { revalidatePath } from "next/cache";

const insertFlare = async (flare: z.infer<typeof FLARE_CREATE_SCHEMA>) => {
  const newFlareId = generateFlareId();
  const createdAt = ISONow();
  const location = makePoint({ lat: flare.lat, lng: flare.lng });

  const flareQuery = sql`INSERT INTO flares (id, category, body, createdAt, location) VALUES (
    ${newFlareId},
    ${flare.category},
    ${flare.body},
    ${createdAt},
    ST_GeomFromText(${location})
  );`;

  const flareTagsIds: number[] = [];
  const tagsToAdd: string[] = [];

  await db.transaction(async (tx) => {
    // Find existing tags
    const mixedTags = await Promise.all(
      flare.tags.map(async (tag) => {
        const res = await result<{ id: number }>(() =>
          tx.execute(sql`SELECT (id) from tags WHERE name = ${tag} LIMIT 1;`)
        );
        return { name: tag, result: res };
      })
    );

    // From the request tags, get which ones are new and which ones are already in the db
    mixedTags.forEach((tag) => {
      if (nil(tag.result)) {
        tagsToAdd.push(tag.name);
      } else {
        flareTagsIds.push(tag.result.id);
      }
      return { name: tag.name, result: tag.result };
    });

    // Add the new tags
    tagsToAdd.forEach(async (tag) => {
      const [res] = await tx.execute(
        sql`INSERT INTO tags (name, createdAt) VALUES (${tag}, ${createdAt});`
      );
      if (res.insertId > 0) {
        flareTagsIds.push(res.insertId);
      }
    });

    // Add the new flare
    await tx.execute(flareQuery);

    // Relate the new flare with the request tags
    flareTagsIds.forEach(async (tagId) => {
      await tx.execute(
        sql`INSERT INTO flare_tags (flareId, tagId, createdAt) VALUES (${newFlareId}, ${tagId}, ${createdAt});`
      );
    });
  });
  revalidatePath("/near-me");
};

const getFlares = async () => {
  return results<Flare>(() =>
    db.execute(
      sql`SELECT id, category, body, createdAt, updateAt, ST_X(location) AS 'lat', ST_Y(location) AS 'lng' FROM flares;`
    )
  );
};

export { insertFlare, getFlares };