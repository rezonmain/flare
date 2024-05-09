import type { Flare } from "@/db/schema";
import type { QueryFunctionContext } from "@tanstack/react-query";

const getFlare = async (context: QueryFunctionContext): Promise<Flare> => {
  const id = context.queryKey[0];
  const response = await fetch(`/api/flare/${id}`);
  return response.json();
};

export { getFlare };
