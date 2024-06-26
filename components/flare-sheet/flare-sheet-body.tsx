"use client";
import { useMemo } from "react";
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
import { FlareSheetBodySkeleton } from "@/components/flare-sheet/flare-sheet-body-skeleton";
import { FlareDelete } from "@/components/flare-sheet/flare-delete";
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

  if (isLoading) return <FlareSheetBodySkeleton />;

  return (
    <>
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
              <strong>Guest #13162</strong>
              <span className="leading-tight text-sm">{timeAgo}</span>
            </p>
          </div>
        </CardHeader>
        <CardContent>
          {empty(data?.tags) ? null : (
            <div className="flex flex-row gap-2 flex-wrap pb-2">
              {data?.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  #{tag.name}
                </Badge>
              ))}
            </div>
          )}
          <p className="pb-2">{data?.body}</p>
          {data?.img ? (
            <div className="py-4 flex items-center justify-center">
              <Image
                height={256}
                width={256}
                src={data.img.url}
                alt="Flare image"
              />
            </div>
          ) : null}
          <FlareSheetActions flareId={flareId} />
        </CardContent>
      </Card>
      <FlareDelete flareId={flareId} />
    </>
  );
};

export { FlareSheetBody };
