import { AdvancedMarker } from "@vis.gl/react-google-maps";
import type { Flare } from "@/db/schema";
import {
  FLARE_CATEGORY_CLASSNAMES,
  FLARE_CATEGORY_ICONS,
} from "@/constants/flare.constants";
import { useClusterer } from "@/hooks/useClusterer";
import { Icon } from "@/components/ui/icon";

type MarkersProps = {
  flares: Flare[];
};

const Markers: React.FC<MarkersProps> = ({ flares }) => {
  const setMarkerRef = useClusterer();

  return (
    <>
      {flares.map((flare) => (
        <AdvancedMarker
          key={flare.id}
          position={{ lat: flare.lat, lng: flare.lng }}
          ref={(marker) => setMarkerRef(marker, flare.id)}
        >
          <Icon
            size={38}
            name={FLARE_CATEGORY_ICONS[flare.category]}
            className={FLARE_CATEGORY_CLASSNAMES[flare.category]}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};

export { Markers };
