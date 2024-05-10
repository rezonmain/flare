import { Suspense } from "react";
import { getFlares } from "@/db/queries";
import { FlareMap } from "@/components/flare-map/flare-map";
import { ADMIN_CAPABILITIES } from "@/constants/map.constants";

export default async function AdminDemoMap() {
  const flares = await getFlares();
  return (
    <Suspense>
      <FlareMap
        defaultCenter={{ lat: 32.5596, lng: -116.6189 }}
        defaultZoom={14}
        flares={flares}
        capabilities={ADMIN_CAPABILITIES}
      />
    </Suspense>
  );
}
