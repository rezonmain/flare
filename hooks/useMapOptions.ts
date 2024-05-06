import { useMemo } from "react";

const useMapOptions = () => {
  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );
  return mapOptions;
};

export { useMapOptions };
