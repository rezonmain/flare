import { MAP_ID } from "@/constants/map.constants";
import { useMapHandlers } from "@/hooks/useMapHandlers";
import type { Geo } from "@/types/geo.types";
import { Map } from "@vis.gl/react-google-maps";

type MapViewProps = {
  children: React.ReactNode;
  defaultCenter: Geo;
  defaultZoom: number;
};

const MapView: React.FC<MapViewProps> = ({
  children,
  defaultCenter,
  defaultZoom,
}) => {
  const handlers = useMapHandlers();

  return (
    <Map
      id={MAP_ID}
      mapId={MAP_ID}
      disableDefaultUI
      defaultCenter={defaultCenter}
      defaultZoom={defaultZoom}
      {...handlers}
    >
      {children}
    </Map>
  );
};

export { MapView };
