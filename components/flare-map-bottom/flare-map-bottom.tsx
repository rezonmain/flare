import { useMemo } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { useGeolocation } from "@uidotdev/usehooks";
import { nil } from "@rezonmain/utils-nil";
import {
  BottomNavigation,
  BottomNavigationAction,
} from "@/components/bottom-navigation/bottom-navigation";
import { NewPostDrawer } from "@/components/new-post-drawer/new-post-drawer";
import { useDrawer } from "@/state";
import { MAP_ID } from "@/constants/map.constants";

const FlareMapBottom = () => {
  const map = useMap(MAP_ID);
  const { latitude: lat, longitude: lng } = useGeolocation();
  const { openDrawer } = useDrawer();

  const actions: BottomNavigationAction[] = useMemo(
    () => [
      {
        label: "Profile",
        icon: "user",
        onClick: () => console.log("Profile"),
      },
      {
        label: "Near me",
        icon: "map-pin",
        onClick: () => {
          if (!map || nil(lat) || nil(lng)) {
            return;
          }
          map.setCenter({
            lat,
            lng,
          });
          map.setZoom(20);
        },
      },
      {
        label: "Trending",
        icon: "sparkles",
        onClick: () => console.log("Trending"),
      },
      {
        label: "Post",
        icon: "pen-line",
        onClick: () =>
          openDrawer({
            name: "new-post",
            component: <NewPostDrawer />,
          }),
      },
    ],
    [openDrawer, map, lat, lng]
  );

  return (
    <div className="fixed bottom-0 w-full flex flex-col gap-4">
      <BottomNavigation actions={actions} />
    </div>
  );
};

export { FlareMapBottom };
