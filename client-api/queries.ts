import type { FlareWithTags } from "@/types/flare.types";
import type { QueryFunctionContext } from "@tanstack/react-query";

const getFlare = async (
  context: QueryFunctionContext
): Promise<FlareWithTags> => {
  const id = context.queryKey[0];
  const response = await fetch(`/api/flare/${id}`);
  return response.json();
};

export { getFlare };
