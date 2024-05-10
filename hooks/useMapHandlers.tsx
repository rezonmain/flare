"use client";
import { empty } from "@rezonmain/utils-empty";
import { useMap, type MapEventProps } from "@vis.gl/react-google-maps";
import { useDrawer, useUser } from "@/state";
import { MAP_ID } from "@/constants/map.constants";
import { MapCapabilities } from "@/constants/map.enum";
import { NewPostDrawer } from "@/components/new-post-drawer/new-post-drawer";
import { useQG } from "@/hooks/useQG";

const useMapHandlers = () => {
  const map = useMap(MAP_ID);
  const { setQG } = useQG();
  const { openDrawer } = useDrawer();
  const { capabilities } = useUser();

  if (empty(capabilities)) {
    return {};
  }

  const handlers: MapEventProps = {
    onIdle: () => {
      if (!map) return;
      const center = map.getCenter();
      const lat = center?.lat() ?? 0;
      const lng = center?.lng() ?? 0;
      const z = map.getZoom() ?? 0;
      setQG({ lat, lng, z });
    },

    onClick: (e) => {
      if (capabilities.includes(MapCapabilities.FLARE_ADD_ANY_WHERE)) {
        openDrawer({
          name: "flare-add-anywhere",
          component: (
            <NewPostDrawer
              location={{
                lat: e.detail.latLng?.lat ?? 0,
                lng: e.detail.latLng?.lng ?? 0,
              }}
            />
          ),
        });
      }
    },
  };

  return handlers;
};

export { useMapHandlers };
