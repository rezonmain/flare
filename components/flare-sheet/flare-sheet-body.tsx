"use client";
import { getFlare } from "@/client-api/queries";
import { useQuery } from "@tanstack/react-query";

type FlareSheetBodyProps = {
  flareId: string;
};

const FlareSheetBody: React.FC<FlareSheetBodyProps> = ({ flareId }) => {
  const { isLoading, data } = useQuery({
    queryKey: [flareId],
    queryFn: getFlare,
  });

  if (isLoading) return <div>Loading...</div>;

  return <div>{JSON.stringify(data)}</div>;
};

export { FlareSheetBody };
