"use client";
import { useCallback } from "react";
import { MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import { useQS } from "@/hooks/useQS";

const useMapHandlers = () => {
  const [_, update] = useQS();

  const onLoad = useCallback(() => {
    console.log("Map Loaded...");
  }, []);

  const onBoundsChanged = useCallback(
    (e: MapCameraChangedEvent) => {
      update({
        lat: e.detail.center.lat.toString(),
        lng: e.detail.center.lng.toString(),
        z: e.detail.zoom.toString(),
      });
    },
    [update]
  );

  return { onLoad, onBoundsChanged };
};

export { useMapHandlers };
