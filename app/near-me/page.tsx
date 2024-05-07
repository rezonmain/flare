import { Suspense } from "react";
import { FlareMap } from "@/components/flare-map/flare-map";

export default async function NearMePage() {
  return (
    <Suspense>
      <FlareMap
        defaultCenter={{ lat: 32.5596, lng: -116.6189 }}
        defaultZoom={14}
      />
    </Suspense>
  );
}
