import { Suspense } from "react";
import Link from "next/link";
import { FlareMap } from "@/components/flare-map/flare-map";
import { getFlares } from "@/db/queries";
import { BASE_CAPABILITIES } from "@/constants/map.constants";

export const dynamic = "force-dynamic";
export default async function NearMePage() {
  const flares = await getFlares();
  return (
    <Suspense>
      <h1 className="text-3xl font-bold fixed top-4 left-4 z-10 opacity-50">
        <Link href="/">Flare</Link>
      </h1>
      <FlareMap
        defaultCenter={{ lat: 32.57182, lng: -116.633 }}
        defaultZoom={14}
        flares={flares}
        capabilities={BASE_CAPABILITIES}
      />
    </Suspense>
  );
}
