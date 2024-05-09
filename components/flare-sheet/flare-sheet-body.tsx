"use client";
import { getFlare } from "@/client-api/queries";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import { UserIcon } from "lucide-react";

type FlareSheetBodyProps = {
  flareId: string;
};

const FlareSheetBody: React.FC<FlareSheetBodyProps> = ({ flareId }) => {
  const { isLoading, data } = useQuery({
    queryKey: [flareId],
    queryFn: getFlare,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex gap-2">
      <Avatar>
        <AvatarImage />
        <AvatarFallback>GS</AvatarFallback>
      </Avatar>
      <div className="flex flex-col bg-muted-foreground text-background p-2 rounded-xl ">
        <p>
          <strong>Guest #41142</strong>
        </p>
        <p>{data?.body}</p>
      </div>
    </div>
  );
};

export { FlareSheetBody };
