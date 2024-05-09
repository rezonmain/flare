"use client";
import { Fragment, useMemo } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useQuery } from "@tanstack/react-query";
import { getFlare } from "@/client-api/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlareSheetActions } from "@/components/flare-sheet/flare-sheet-actions";
import { empty } from "@rezonmain/utils-empty";
dayjs.extend(relativeTime);

type FlareSheetBodyProps = {
  flareId: string;
};

const FlareSheetBody: React.FC<FlareSheetBodyProps> = ({ flareId }) => {
  const { isLoading, data } = useQuery({
    queryKey: [flareId],
    queryFn: getFlare,
  });
  const timeAgo = useMemo(
    () => dayjs(data?.createdAt).fromNow(),
    [data?.createdAt]
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>
              <Image src="/avatar.webp" alt="Avatar" width={40} height={40} />
            </AvatarFallback>
          </Avatar>
          <p className="flex flex-col">
            <strong>Guest #41142</strong>
            <span className="leading-tight text-sm">{timeAgo}</span>
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {empty(data?.tags) ? null : (
          <div className="flex flex-row gap-2 flex-wrap pb-2">
            {data?.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
        <p className="pb-2">{data?.body}</p>
        <FlareSheetActions flareId={flareId} />
      </CardContent>
    </Card>
  );
};

export { FlareSheetBody };
