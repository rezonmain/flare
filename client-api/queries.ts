import type { Flare } from "@/db/schema";
import type { FlareWithTags } from "@/types/flare.types";
import type { QueryFunctionContext } from "@tanstack/react-query";

const getFlare = async (
  context: QueryFunctionContext
): Promise<FlareWithTags> => {
  const id = context.queryKey[0];
  const response = await fetch(`/api/flare/${id}`);
  return response.json();
};

const deleteFlare = async (id: Flare["id"]) => {
  await fetch(`/api/flare/${id}`, { method: "DELETE" });
};

export { getFlare, deleteFlare };
