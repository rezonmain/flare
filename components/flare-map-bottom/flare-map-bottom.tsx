import { useMemo } from "react";
import { useAtom } from "jotai";
import {
  BottomNavigation,
  BottomNavigationAction,
} from "@/components/bottom-navigation/bottom-navigation";
import { NewPostDrawer } from "@/components/new-post-drawer/new-post-drawer";
import { drawerAtom } from "@/state/map.state";

const FlareMapBottom = () => {
  const [drawer, setDrawer] = useAtom(drawerAtom);

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
        onClick: () => console.log("Near me"),
      },
      {
        label: "Trending",
        icon: "sparkles",
        onClick: () => console.log("Trending"),
      },
      {
        label: "Post",
        icon: "pen-line",
        onClick: () => setDrawer(true),
      },
    ],
    [setDrawer]
  );

  return (
    <div className="fixed bottom-0 w-full flex flex-col gap-4">
      <BottomNavigation actions={actions} />
      <NewPostDrawer isOpen={drawer} onOpenChange={setDrawer} />
    </div>
  );
};

export { FlareMapBottom };
