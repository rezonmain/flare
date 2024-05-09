"use client";
import { type MapEventProps } from "@vis.gl/react-google-maps";
import { useSetAtom } from "jotai";
import { nil } from "@rezonmain/utils-nil";
import { drawerAtom } from "@/state/map.state";
import { useQS } from "@/hooks/useQS";

const useMapHandlers = (capabilities?: (keyof MapEventProps)[]) => {
  const [_, update] = useQS();
  const setDrawer = useSetAtom(drawerAtom);

  if (nil(capabilities)) {
    return {};
  }

  const handlers: MapEventProps = {
    onBoundsChanged: (e) => {
      update({
        lat: e.detail.center.lat.toString(),
        lng: e.detail.center.lng.toString(),
        z: e.detail.zoom.toString(),
      });
    },

    onDblclick: (e) => {
      setDrawer(true);
    },
  };

  Object.keys(handlers).forEach((key) => {
    if (!capabilities.includes(key as keyof MapEventProps)) {
      delete handlers[key as keyof MapEventProps];
    }
  });

  return handlers;
};

export { useMapHandlers };
