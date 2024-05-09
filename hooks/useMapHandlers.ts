"use client";
import { empty } from "@rezonmain/utils-empty";
import { useMap, type MapEventProps } from "@vis.gl/react-google-maps";
import { MapCapabilities } from "@/constants/map.enum";
import { useQG } from "@/hooks/useQG";
import { nil } from "@rezonmain/utils-nil";
import { MAP_ID } from "@/constants/map.constants";

const useMapHandlers = (capabilities?: MapCapabilities[]) => {
  const map = useMap(MAP_ID);
  const { setQG } = useQG();

  if (empty(capabilities)) {
    return {};
  }

  const handlers: MapEventProps = {
    onIdle: () => {
      if (capabilities.includes(MapCapabilities.STATE_ON_IDLE)) {
        const center = map?.getCenter();
        if (nil(center)) return;
        setQG({ lat: center.lat(), lng: center.lng(), z: map?.getZoom() ?? 0 });
      }
    },
  };

  return handlers;
};

export { useMapHandlers };
