"use server";
import { sql } from "drizzle-orm";
import { db } from "@/db/connection";
import { NewFlare } from "@/db/schema";
import { generateFlareId } from "@/helpers/flare.helpers";
import { ISONow } from "@/helpers/time.helpers";

const insertFlare = async (flare: NewFlare) => {
  const res = await db.execute(
    sql`INSERT INTO flares (id, category, body, createdAt, location) VALUES (${generateFlareId()}, ${
      flare.category
    }, ${flare.body}, ${ISONow()}, POINT(${flare.location.lat} ${
      flare.location.lng
    }));`
  );

  console.log(res);
};

export { insertFlare };
