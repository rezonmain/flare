"use server";
import { sql } from "drizzle-orm";
import { NewFlare } from "@/db/schema";
import { generateFlareId } from "@/helpers/flare.helpers";
import { ISONow } from "@/helpers/time.helpers";
import { db } from "../connection";

const insertFlare = async (flare: NewFlare) => {
  const res = await db.execute(
    sql`INSERT INTO flares (
      id, 
      category, 
      body, 
      createdAt, 
      location
    ) VALUES (
      ${generateFlareId()}, 
      ${flare.category}, 
      ${flare.body}, 
      ${ISONow()}, 
      ST_GeomFromText('POINT(${flare.location.lat} ${flare.location.lng})')
    );`
  );
};

export { insertFlare };
