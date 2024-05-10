import { auth } from "@/auth";
import { deleteFlare, getFlare } from "@/db/queries";
import { getRole } from "@/db/queries/roles.queries";
import type { Flare } from "@/db/schema";
import { empty } from "@rezonmain/utils-empty";
import { nil } from "@rezonmain/utils-nil";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: Flare["id"] } }
) {
  const flare = await getFlare(params.id);
  return Response.json(flare);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: Flare["id"] } }
) {
  const session = await auth();

  if (nil(session)) {
    return new Response("Not authenticated", { status: 401 });
  }

  if (empty(session.user?.email)) {
    return new Response("Unauthorized", { status: 403 });
  }

  const role = await getRole(session.user.email);

  if (empty(role)) {
    return new Response("Unauthorized", { status: 403 });
  }

  await deleteFlare(params.id);
  revalidatePath("/admin/demo-map");
  return new Response("Deleted", { status: 200 });
}
