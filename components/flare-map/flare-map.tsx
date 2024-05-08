"use client";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import type { Geo } from "@/types/geo.types";
import { useMapOptions } from "@/hooks/useMapOptions";
import { useMapHandlers } from "@/hooks/useMapHandlers";
import { FlareMapBottom } from "@/components/flare-map-bottom/flare-map-bottom";
import { Icon } from "@/components/ui/icon";
import { type Flare } from "@/db/schema";
import { env } from "@/config/env.mjs";
import { FLARE_CATEGORY_ICONS } from "@/constants/flare.constants";
import { Markers } from "@/components/marker/markers";

type MapProps = {
  defaultCenter: Geo;
  defaultZoom: number;
  flares: Flare[];
};

const FlareMap: React.FC<MapProps> = ({
  defaultCenter,
  defaultZoom,
  flares,
}) => {
  const mapOptions = useMapOptions();
  const handlers = useMapHandlers();

  return (
    <div className="h-screen w-full">
      <APIProvider apiKey={""}>
        <Map
          mapId={"8e0a97af9386fef"}
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
