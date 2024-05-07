"use client";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import type { Geo } from "@/types/geo.types";
import { useMapOptions } from "@/hooks/useMapOptions";
import { useMapHandlers } from "@/hooks/useMapHandlers";
import mapStyles from "@/constants/styles.json";
import { FlareMapBottom } from "../flare-map-bottom/flare-map-bottom";
import { Flare } from "@/db/schema";

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
      <APIProvider apiKey="">
        <Map
          disableDefaultUI
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          styles={mapStyles}
          {...handlers}
        >
          {flares.map((flare) => (
            <Marker
              key={flare.id}
              position={{ lat: flare.lat, lng: flare.lng }}
            />
          ))}
        </Map>
      </APIProvider>
      <FlareMapBottom />
    </div>
  );
};

export { FlareMap };
