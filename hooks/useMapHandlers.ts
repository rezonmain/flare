"use client";
import { empty } from "@rezonmain/utils-empty";
import { type MapEventProps } from "@vis.gl/react-google-maps";
import { MapCapabilities } from "@/constants/map.enum";

const useMapHandlers = (capabilities?: MapCapabilities[]) => {
  if (empty(capabilities)) {
    return {};
  }

  const handlers: MapEventProps = {};

  return handlers;
};

export { useMapHandlers };
