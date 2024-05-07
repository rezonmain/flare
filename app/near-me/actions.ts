"use server";

import { FLARE_CREATE_SCHEMA } from "@/constants/flare.constants";
import { z } from "zod";

async function createFlare(flare: z.infer<typeof FLARE_CREATE_SCHEMA>) {
  console.info(flare);
}

export { createFlare };
