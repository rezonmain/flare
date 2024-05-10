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
      const url = new URL(window.location.href);
      const parsedGeo = `${geo.lat.toFixed(6)},${geo.lng.toFixed(
        6
      )},${geo.z.toFixed(2)}z`;
      const searchParams = new URLSearchParams(url.search);
      searchParams.set("at", parsedGeo);
      url.search = searchParams.toString();
      window.history.pushState({}, "", url.toString());
    },
    [isClient]
  );

  const getQG = (): GeoZ => {
    if (!isClient) return { lat: 0, lng: 0, z: 0 };
    const url = new URL(window.location.href);
    const search = url.searchParams.get("at");
    const parsedGeo = search?.split(",") || ["0", "0", "0"];
    return {
      lat: parseFloat(parsedGeo[0]),
      lng: parseFloat(parsedGeo[1]),
      z: parseFloat(parsedGeo[2]),
    };
  };

  return { setQG, getQG };
};

export { useQG };
