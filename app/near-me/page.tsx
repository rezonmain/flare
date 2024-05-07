import { Suspense } from "react";
import { FlareMap } from "@/components/flare-map/flare-map";
import { getFlares } from "@/db/queries";

export default async function NearMePage() {
  const flares = await getFlares();
  return (
    <Suspense>
      <FlareMap
        defaultCenter={{ lat: 32.5596, lng: -116.6189 }}
        defaultZoom={14}
        flares={flares}
      />
    </Suspense>
  );
}
