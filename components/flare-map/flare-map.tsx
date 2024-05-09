"use client";
import {
  APIProvider,
  Map,
  type MapEventProps,
} from "@vis.gl/react-google-maps";
import type { Geo } from "@/types/geo.types";
import { useMapHandlers } from "@/hooks/useMapHandlers";
import { FlareMapBottom } from "@/components/flare-map-bottom/flare-map-bottom";
import { type Flare } from "@/db/schema";
import { Markers } from "@/components/marker/markers";
import { MAP_ID } from "@/constants/map.constants";

type MapProps = {
  defaultCenter: Geo;
  defaultZoom: number;
  flares: Flare[];
  capabilities?: (keyof MapEventProps)[];
};

const FlareMap: React.FC<MapProps> = ({
  defaultCenter,
  defaultZoom,
  flares,
  capabilities,
}) => {
  const handlers = useMapHandlers(capabilities);
  console.log(handlers);
  return (
    <div className="h-screen w-full">
      <APIProvider apiKey={""}>
        <Map
          id={MAP_ID}
          mapId={MAP_ID}
          disableDefaultUI
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          {...handlers}
        >
          <Markers flares={flares} />
        </Map>
      </APIProvider>
      <FlareMapBottom />
    </div>
  );
};

export { FlareMap };
