"use client";

import type { Geo } from "@/types/geo.types";
import { useIsClient } from "@uidotdev/usehooks";
import { useCallback } from "react";

/**
 * Update and read the GEO position url parameters
 */
const useQG = () => {
  const isClient = useIsClient();

  const setQG = useCallback(
    (geo: Geo) => {
      if (!isClient) return;
      const pathName = window.location.pathname.split("/@")[0];
      const parsedGeo = `${geo.lat},${geo.lng}`;
      const newPathName = `${pathName}/@${parsedGeo}`;
      const url = new URL(window.location.href);
      url.pathname = newPathName;
      window.history.pushState({}, "", url.toString());
    },
    [isClient]
  );

  const getQG = () => {
    const url = new URL(window.location.href);
    return url.searchParams.get("qg") || "";
  };

  return { setQG, getQG };
};

export { useQG };
