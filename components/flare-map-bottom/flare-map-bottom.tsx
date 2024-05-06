import { useMemo, useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
} from "../bottom-navigation/bottom-navigation";
import { NewPostButton } from "../new-post-button/new-post-button";
import { NewPostDrawer } from "../new-post-drawer/new-post-drawer";

const FlareMapBottom = () => {
  const [drawer, setDrawer] = useState(false);

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
    ],
    []
  );

  return (
    <div className="fixed bottom-0 w-full flex flex-col gap-4">
      <div className="ml-auto pr-4">
        <NewPostButton onClick={() => setDrawer(true)} />
      </div>
      <BottomNavigation actions={actions} />
      <NewPostDrawer isOpen={drawer} onOpenChange={setDrawer} />
    </div>
  );
};

export { FlareMapBottom };
