import { getFlare } from "@/db/queries";
import type { Flare } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: Flare["id"] } }
) {
  const flare = await getFlare(params.id);
  return Response.json(flare);
}
