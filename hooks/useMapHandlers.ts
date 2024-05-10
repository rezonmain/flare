"use client";
import { empty } from "@rezonmain/utils-empty";
import { useMap, type MapEventProps } from "@vis.gl/react-google-maps";
import { mapCenterAtom, useSetAtom, useUser } from "@/state";
import { MAP_ID } from "@/constants/map.constants";
import { MapCapabilities } from "@/constants/map.enum";

const useMapHandlers = () => {
  const map = useMap(MAP_ID);
  const { capabilities } = useUser();
  const setMapCenter = useSetAtom(mapCenterAtom);

  if (empty(capabilities)) {
    return {};
  }

  const handlers: MapEventProps = {
    onIdle: () => {
      if (!map) return;
      const center = map.getCenter();
      const zoom = map.getZoom();
      setMapCenter({
        lat: center?.lat() ?? 0,
        lng: center?.lng() ?? 0,
        z: zoom ?? 0,
      });
    },

    onClick: () => {
      if (capabilities.includes(MapCapabilities.FLARE_ADD_ANY_WHERE)) {
        alert("Add flare");
      }
    },
  };

  return handlers;
};

export { useMapHandlers };
