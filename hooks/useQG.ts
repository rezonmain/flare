"use client";

import type { Geo, GeoZ } from "@/types/geo.types";
import { useIsClient } from "@uidotdev/usehooks";
import { useCallback } from "react";

/**
 * Update and read the GEO position url parameters
 * In order to use, must update route to have an optional dynamic segment
 * see: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#optional-catch-all-segments
 */
const useQG = () => {
  const isClient = useIsClient();

  const setQG = useCallback(
    (geo: GeoZ) => {
      if (!isClient) return;
      const pathName = window.location.pathname.split("/@")[0];
      const parsedGeo = `${geo.lat},${geo.lng},${geo.z.toFixed(2)}z`;
      const newPathName = `${pathName}/@${parsedGeo}`;
      const url = new URL(window.location.href);
      url.pathname = newPathName;
      window.history.pushState({}, "", url.toString());
    },
    [isClient]
  );

  const getQG = (): GeoZ => {
    if (!isClient) return { lat: 0, lng: 0, z: 0 };
    const pathName = window.location.pathname.split("/@")[1];
    const parsedGeo = pathName?.split(",") || ["0", "0", "0"];
    return {
      lat: parseFloat(parsedGeo[0]),
      lng: parseFloat(parsedGeo[1]),
      z: parseFloat(parsedGeo[2]),
    };
  };

  return { setQG, getQG };
};

export { useQG };
