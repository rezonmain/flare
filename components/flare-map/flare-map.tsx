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
import { Flare } from "@/db/schema";
import { env } from "@/config/env.mjs";
import { MapIcon } from "lucide-react";
import { Icon } from "../ui/icon";
import { FLARE_CATEGORY_ICONS } from "@/constants/flare.constants";

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
      <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_API_KEY}>
        <Map
          mapId={"8e0a97af9386fef"}
          disableDefaultUI
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          {...handlers}
        >
          {flares.map((flare) => (
            <AdvancedMarker
              key={flare.id}
              position={{ lat: flare.lat, lng: flare.lng }}
            >
              <Icon name={FLARE_CATEGORY_ICONS[flare.category]} />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
      <FlareMapBottom />
    </div>
  );
};

export { FlareMap };
