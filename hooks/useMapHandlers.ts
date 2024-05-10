"use client";
import { empty } from "@rezonmain/utils-empty";
import { useMap, type MapEventProps } from "@vis.gl/react-google-maps";
import { mapCenterAtom, useSetAtom } from "@/state";
import { MapCapabilities } from "@/constants/map.enum";
import { MAP_ID } from "@/constants/map.constants";

const useMapHandlers = (capabilities?: MapCapabilities[]) => {
  const map = useMap(MAP_ID);
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
  };

  return handlers;
};

export { useMapHandlers };
