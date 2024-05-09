"use client";
import { APIProvider } from "@vis.gl/react-google-maps";
import type { Geo } from "@/types/geo.types";
import { FlareMapBottom } from "@/components/flare-map-bottom/flare-map-bottom";
import { type Flare } from "@/db/schema";
import { Markers } from "@/components/marker/markers";
import type { MapCapabilities } from "@/constants/map.enum";
import { MapView } from "@/components/map-view/map-view";

type MapProps = {
  defaultCenter: Geo;
  defaultZoom: number;
  flares: Flare[];
  capabilities?: MapCapabilities[];
};

const FlareMap: React.FC<MapProps> = ({
  defaultCenter,
  defaultZoom,
  flares,
  capabilities,
}) => {
  return (
    <div className="h-screen w-full">
      <APIProvider apiKey={""}>
        <MapView
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          capabilities={capabilities}
        >
          <Markers flares={flares} />
        </MapView>
        <FlareMapBottom />
      </APIProvider>
    </div>
  );
};

export { FlareMap };
