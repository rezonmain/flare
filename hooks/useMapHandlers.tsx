"use client";
import { empty } from "@rezonmain/utils-empty";
import { useMap, type MapEventProps } from "@vis.gl/react-google-maps";
import { mapCenterAtom, useDrawer, useSetAtom, useUser } from "@/state";
import { MAP_ID } from "@/constants/map.constants";
import { MapCapabilities } from "@/constants/map.enum";
import { NewPostDrawer } from "@/components/new-post-drawer/new-post-drawer";

const useMapHandlers = () => {
  const map = useMap(MAP_ID);
  const { openDrawer } = useDrawer();
  const { capabilities } = useUser();
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
