"use client";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import type { Geo } from "@/types/geo.types";
import { useMapOptions } from "@/hooks/useMapOptions";
import { useMapHandlers } from "@/hooks/useMapHandlers";
import mapStyles from "@/constants/styles.json";
import { FlareMapBottom } from "../flare-map-bottom/flare-map-bottom";

type MapProps = {
  defaultCenter: Geo;
  defaultZoom: number;
};

const FlareMap: React.FC<MapProps> = ({ defaultCenter, defaultZoom }) => {
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
          <Marker position={defaultCenter} />
        </Map>
      </APIProvider>
      <FlareMapBottom />
    </div>
  );
};

export { FlareMap };
