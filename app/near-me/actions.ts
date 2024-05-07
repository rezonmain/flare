"use server";
import { z } from "zod";
import { FLARE_CREATE_SCHEMA } from "@/constants/flare.constants";
import { insertFlare } from "@/db/queries/flares.queries";

const createFlare = async (flare: z.infer<typeof FLARE_CREATE_SCHEMA>) => {
  insertFlare(flare);
};

export { createFlare };
